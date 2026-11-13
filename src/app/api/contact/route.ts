import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { clientIp, rateLimit } from '@/lib/rateLimit'
import { esc, internalEmail } from '@/lib/email'
import { CONTACT_TOPICS, CONTACT_TOPIC_VALUES } from '@/config/forms'
import { SITE } from '@/config/site'

const resend = new Resend(process.env.RESEND_API_KEY)

const schema = z.object({
  name:    z.string().trim().min(1).max(100),
  company: z.string().trim().max(200).optional(),
  phone:   z.string().trim().regex(/^\+?[\d\s()-]{7,20}$/),
  email:   z.string().trim().email().max(254),
  topic:   z.string().refine(v => (CONTACT_TOPIC_VALUES as readonly string[]).includes(v)),
  message: z.string().trim().min(1).max(5000),
  consent: z.literal(true),
})

export async function POST(req: Request) {
  if (!rateLimit(`contact:${clientIp(req)}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  const body = await req.json().catch(() => null)
  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  // Honeypot: hidden field real users never fill — pretend success for bots
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return NextResponse.json({ ok: true })
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid request', fields: Object.keys(z.flattenError(parsed.error).fieldErrors) },
      { status: 400 },
    )
  }

  const { name, company, phone, email, topic, message } = parsed.data
  const topicLabel = CONTACT_TOPICS.find(t => t.value === topic)?.label ?? topic
  const FROM = process.env.RESEND_FROM_EMAIL ?? 'Astacraft Systems <onboarding@resend.dev>'
  const TO = process.env.CONTACT_TO_EMAIL!
  const firstName = name.split(' ')[0]

  const internal = resend.emails.send({
    from: FROM,
    to: TO,
    replyTo: email,
    subject: `New enquiry from ${name}: ${topicLabel}`,
    html: internalEmail(
      'New contact enquiry',
      [
        ['Name', name],
        ['Company', company || '—'],
        ['Phone', phone],
        ['Email', email],
        ['Help with', topicLabel],
        ['Message', message],
        ['Consent', 'Agreed to be contacted about this enquiry'],
      ],
      'Sent from the contact form on astacraftsystems.com',
    ),
  })

  const autoReply = resend.emails.send({
    from: FROM,
    to: email,
    subject: `We've received your message, ${firstName}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#0B0F14">
        <div style="background:#1D4776;padding:28px 32px">
          <p style="color:#fff;margin:0;font-size:18px;font-weight:700">${esc(SITE.companyShort)}</p>
        </div>
        <div style="padding:36px 32px;background:#ffffff;border:1px solid #e2e8f0;border-top:none">
          <h1 style="font-size:22px;font-weight:700;margin:0 0 12px;line-height:1.3">Thanks, ${esc(firstName)}.</h1>
          <p style="font-size:15px;color:#334155;line-height:1.7;margin:0 0 16px">
            We&rsquo;ve received your message and we&rsquo;ll reply within one working day.
          </p>
          <p style="font-size:15px;color:#334155;line-height:1.7;margin:0">
            You can also reach us on ${esc(SITE.phone)} or by replying to this email.
          </p>
        </div>
        <div style="padding:18px 32px;background:#F6F7FB;border:1px solid #e2e8f0;border-top:none;text-align:center">
          <p style="font-size:11px;color:#64748b;margin:0">${esc(SITE.company)} &middot; ${esc(SITE.address.street)}, ${esc(SITE.address.area)}, ${esc(SITE.address.city)}</p>
        </div>
      </div>`,
  })

  const [internalResult, autoReplyResult] = await Promise.all([internal, autoReply])

  if (internalResult.error) {
    console.error('[contact] send failed:', internalResult.error)
    return NextResponse.json({ error: 'Send failed' }, { status: 502 })
  }
  if (autoReplyResult.error) {
    console.error('[contact] auto-reply failed:', autoReplyResult.error)
  }

  return NextResponse.json({ ok: true })
}
