import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { clientIp, rateLimit } from '@/lib/rateLimit'
import { internalEmail } from '@/lib/email'
import { WAITLIST_INDUSTRIES, WAITLIST_INDUSTRY_VALUES } from '@/config/forms'
import { PRODUCTS } from '@/config/site'

const resend = new Resend(process.env.RESEND_API_KEY)

const schema = z.object({
  name:     z.string().trim().min(1).max(100),
  business: z.string().trim().min(1).max(200),
  phone:    z.string().trim().regex(/^\+?[\d\s()-]{7,20}$/),
  email:    z.string().trim().email().max(254),
  industry: z.string().refine(v => WAITLIST_INDUSTRY_VALUES.includes(v)),
  staff:    z.coerce.number().int().min(1).max(10000),
  consent:  z.literal(true),
})

export async function POST(req: Request) {
  if (!rateLimit(`waitlist:${clientIp(req)}`, 5, 10 * 60 * 1000)) {
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

  const { name, business, phone, email, industry, staff } = parsed.data
  const industryLabel = WAITLIST_INDUSTRIES.find(i => i.value === industry)?.label ?? industry
  const FROM = process.env.RESEND_FROM_EMAIL ?? 'Astacraft Systems <onboarding@resend.dev>'
  const TO = process.env.CONTACT_TO_EMAIL!
  const audienceId = process.env.RESEND_DONDO_AUDIENCE_ID

  const tasks: Promise<{ error: unknown }>[] = [
    resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `${PRODUCTS.dondo.name} pilot waitlist: ${business}`,
      html: internalEmail(
        `${PRODUCTS.dondo.name} pilot waitlist`,
        [
          ['Name', name],
          ['Business', business],
          ['Phone (WhatsApp)', phone],
          ['Email', email],
          ['Industry', industryLabel],
          ['Staff answering customers', String(staff)],
          ['Consent', 'Agreed to be contacted about Dondo by WhatsApp and email'],
          ['Submitted', new Date().toISOString()],
        ],
        'Sent from the Dondo waitlist form on astacraftsystems.com',
      ),
    }),
  ]

  if (audienceId) {
    tasks.push(
      resend.contacts.create({
        email,
        firstName: name.split(' ')[0],
        lastName: name.split(' ').slice(1).join(' ') || undefined,
        audienceId,
        unsubscribed: false,
      }),
    )
  }

  const [internal] = await Promise.allSettled(tasks)
  if (internal.status === 'rejected' || internal.value.error) {
    console.error('[waitlist] send failed:', internal.status === 'rejected' ? internal.reason : internal.value.error)
    return NextResponse.json({ error: 'Send failed' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
