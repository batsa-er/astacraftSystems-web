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
  const body = await req.json().catch(() => null)
  const parsed = schema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid request', details: parsed.error.flatten() }, { status: 400 })
  }

  const { name, email, company, phone, service, budget, message } = parsed.data
  const serviceLabel = humanize(service)
  const budgetLabel  = budget ? (BUDGET_LABELS[budget] ?? humanize(budget)) : '—'

  await resend.emails.send({
    from: 'Astacraft Systems <onboarding@resend.dev>',
    to: TO,
    replyTo: email,
    subject: `New enquiry from ${name}`,
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

  return NextResponse.json({ ok: true })
}
