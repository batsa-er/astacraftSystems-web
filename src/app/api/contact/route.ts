import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const resend = new Resend(process.env.RESEND_API_KEY)
const TO = process.env.CONTACT_TO_EMAIL!

const schema = z.object({
  name:    z.string().min(1).max(100),
  email:   z.string().email().max(254),
  message: z.string().min(1).max(5000),
  company: z.string().max(200).optional(),
  phone:   z.string().max(30).optional(),
  service: z.string().max(100).optional(),
  budget:  z.string().max(50).optional(),
})

function humanize(slug: string | undefined) {
  if (!slug) return '—'
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

const BUDGET_LABELS: Record<string, string> = {
  'under-10k':  'Under GH₵ 10,000',
  '10k-50k':    'GH₵ 10,000 – 50,000',
  '50k-200k':   'GH₵ 50,000 – 200,000',
  '200k-plus':  'GH₵ 200,000+',
  'not-sure':   'Not sure yet',
}

export async function POST(req: Request) {
  let rawFields: Record<string, unknown>
  let attachment: { filename: string; content: Buffer } | undefined

  const ct = req.headers.get('content-type') ?? ''
  if (ct.includes('multipart/form-data')) {
    const fd = await req.formData().catch(() => null)
    if (!fd) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    rawFields = Object.fromEntries(
      ['name', 'email', 'company', 'phone', 'service', 'budget', 'message'].map(k => [k, fd.get(k) ?? undefined])
    )
    const f = fd.get('file')
    if (f instanceof File && f.size > 0) {
      if (f.size > 10 * 1024 * 1024) {
        return NextResponse.json({ error: 'File too large' }, { status: 413 })
      }
      attachment = { filename: f.name, content: Buffer.from(await f.arrayBuffer()) }
    }
  } else {
    rawFields = await req.json().catch(() => null) ?? {}
  }

  const parsed = schema.safeParse(rawFields)

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid request', details: parsed.error.flatten() }, { status: 400 })
  }

  const { name, email, company, phone, service, budget, message } = parsed.data
  const serviceLabel = humanize(service)
  const budgetLabel  = budget ? (BUDGET_LABELS[budget] ?? humanize(budget)) : '—'

  const internalEmail = resend.emails.send({
    from: 'Astacraft Systems <onboarding@resend.dev>',
    to: TO,
    replyTo: email,
    subject: `New enquiry from ${name}`,
    ...(attachment && { attachments: [attachment] }),
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#0B0F14">
        <div style="background:#1D4776;padding:24px 32px">
          <h1 style="color:#fff;margin:0;font-size:20px;font-weight:600">New Contact Enquiry</h1>
        </div>
        <div style="padding:32px;background:#F6F7FB;border:1px solid #e2e8f0">
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;font-size:12px;color:#64748b;text-transform:uppercase;letter-spacing:0.1em;width:120px">Name</td><td style="padding:8px 0;font-size:15px;font-weight:500">${name}</td></tr>
            <tr><td style="padding:8px 0;font-size:12px;color:#64748b;text-transform:uppercase;letter-spacing:0.1em">Email</td><td style="padding:8px 0;font-size:15px"><a href="mailto:${email}" style="color:#1D4776">${email}</a></td></tr>
            <tr><td style="padding:8px 0;font-size:12px;color:#64748b;text-transform:uppercase;letter-spacing:0.1em">Company</td><td style="padding:8px 0;font-size:15px">${company || '—'}</td></tr>
            <tr><td style="padding:8px 0;font-size:12px;color:#64748b;text-transform:uppercase;letter-spacing:0.1em">Phone</td><td style="padding:8px 0;font-size:15px">${phone || '—'}</td></tr>
            <tr><td style="padding:8px 0;font-size:12px;color:#64748b;text-transform:uppercase;letter-spacing:0.1em">Service</td><td style="padding:8px 0;font-size:15px">${serviceLabel}</td></tr>
            <tr><td style="padding:8px 0;font-size:12px;color:#64748b;text-transform:uppercase;letter-spacing:0.1em">Budget</td><td style="padding:8px 0;font-size:15px">${budgetLabel}</td></tr>
          </table>
          <hr style="border:none;border-top:1px solid #e2e8f0;margin:20px 0" />
          <p style="font-size:12px;color:#64748b;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 10px">Message</p>
          <p style="font-size:15px;line-height:1.7;margin:0;white-space:pre-wrap">${message}</p>
        </div>
        <div style="padding:16px 32px;font-size:11px;color:#94a3b8;text-align:center">
          Sent from astacraftsystems.com contact form
        </div>
      </div>
    `,
  })

  const autoReply = resend.emails.send({
    from: 'Astacraft Systems <onboarding@resend.dev>',
    to: email,
    subject: `We've received your enquiry, ${name.split(' ')[0]}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#0B0F14">

        <div style="background:#1D4776;padding:32px">
          <img src="https://astacraftsystems.com/astacraft-logo-white.svg" alt="Astacraft Systems" height="36" style="display:block;margin-bottom:0" />
        </div>

        <div style="padding:40px 32px;background:#ffffff;border:1px solid #e2e8f0;border-top:none">
          <p style="font-size:13px;color:#64748b;text-transform:uppercase;letter-spacing:0.12em;margin:0 0 16px">Enquiry confirmed</p>
          <h1 style="font-size:24px;font-weight:700;margin:0 0 12px;color:#080C14;line-height:1.3">
            Thanks, ${name.split(' ')[0]}. You&rsquo;re all set.
          </h1>
          <p style="font-size:15px;color:#475569;line-height:1.7;margin:0 0 32px">
            We&rsquo;ve received your message and a senior member of our team will be in touch within <strong>24 hours</strong> to confirm your complimentary strategy call.
          </p>

          <div style="background:#F6F7FB;border:1px solid #e2e8f0;padding:24px;margin-bottom:32px">
            <p style="font-size:11px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.12em;margin:0 0 16px">What happens next</p>
            ${[
              ['01', 'Calendar invite from our team', 'We&rsquo;ll send a calendar invite for a time that works for you.'],
              ['02', 'Brief prep questions (optional)', 'To make the call as useful as possible, we may send a short list of questions beforehand.'],
              ['03', '45 minutes with a senior advisor', 'We review your systems, identify opportunities, and map a clear technology path forward.'],
            ].map(([n, title, body]) => `
              <div style="display:flex;gap:16px;margin-bottom:20px">
                <span style="font-size:20px;font-weight:800;color:#1D477626;min-width:32px;line-height:1">${n}</span>
                <div>
                  <p style="font-size:14px;font-weight:600;color:#0B0F14;margin:0 0 4px">${title}</p>
                  <p style="font-size:13px;color:#64748b;margin:0;line-height:1.6">${body}</p>
                </div>
              </div>
            `).join('')}
          </div>

          <div style="background:#F6F7FB;border:1px solid #e2e8f0;border-left:3px solid #1D4776;padding:16px 20px;margin-bottom:32px">
            <p style="font-size:11px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.12em;margin:0 0 12px">Your submission</p>
            <table style="width:100%;border-collapse:collapse;font-size:13px">
              ${company ? `<tr><td style="padding:4px 0;color:#94a3b8;width:100px">Company</td><td style="padding:4px 0;color:#0B0F14">${company}</td></tr>` : ''}
              ${service ? `<tr><td style="padding:4px 0;color:#94a3b8">Looking for</td><td style="padding:4px 0;color:#0B0F14">${serviceLabel}</td></tr>` : ''}
            </table>
          </div>

          <p style="font-size:14px;color:#475569;line-height:1.7;margin:0 0 8px">
            In the meantime, feel free to reply to this email if you have any questions.
          </p>
          <p style="font-size:14px;color:#475569;margin:0">
            — The Astacraft Systems Team
          </p>
        </div>

        <div style="padding:20px 32px;background:#F6F7FB;border:1px solid #e2e8f0;border-top:none;text-align:center">
          <p style="font-size:11px;color:#94a3b8;margin:0">
            Astacraft Systems Limited &middot; Accra, Ghana &middot;
            <a href="https://astacraftsystems.com" style="color:#1D4776;text-decoration:none">astacraftsystems.com</a>
          </p>
        </div>

      </div>
    `,
  })

  await Promise.all([internalEmail, autoReply])

  return NextResponse.json({ ok: true })
}
