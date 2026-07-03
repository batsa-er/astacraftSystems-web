import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { clientIp, rateLimit } from '@/lib/rateLimit'

const resend = new Resend(process.env.RESEND_API_KEY)

const schema = z.object({
  email: z.string().email().max(254),
  name:  z.string().max(100).optional(),
})

function esc(v: string) {
  return v
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export async function POST(req: Request) {
  if (!rateLimit(`newsletter:${clientIp(req)}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })

  // Honeypot: hidden field real users never fill — pretend success for bots
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return NextResponse.json({ ok: true })
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })

  const { email, name } = parsed.data
  const audienceId = process.env.RESEND_AUDIENCE_ID
  const FROM = process.env.RESEND_FROM_EMAIL ?? 'Astacraft Systems <onboarding@resend.dev>'
  const TO = process.env.CONTACT_TO_EMAIL!

  const tasks: Promise<{ error: unknown }>[] = []

  if (audienceId) {
    tasks.push(
      resend.contacts.create({
        email,
        firstName: name?.split(' ')[0],
        lastName: name?.split(' ').slice(1).join(' ') || undefined,
        audienceId,
        unsubscribed: false,
      })
    )
  }

  tasks.push(
    resend.emails.send({
      from: FROM,
      to: TO,
      subject: `Newsletter signup: ${email}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;background:#F6F7FB;border:1px solid #e2e8f0">
          <p style="font-size:14px;color:#0B0F14;margin:0 0 8px"><strong>New newsletter subscriber</strong></p>
          <p style="font-size:14px;color:#475569;margin:0">Email: <a href="mailto:${esc(email)}" style="color:#1D4776">${esc(email)}</a></p>
          ${name ? `<p style="font-size:14px;color:#475569;margin:4px 0 0">Name: ${esc(name)}</p>` : ''}
          <p style="font-size:11px;color:#94a3b8;margin:20px 0 0">Source: The Infrastructure Brief signup — astacraftsystems.com</p>
        </div>
      `,
    })
  )

  const results = await Promise.allSettled(tasks)
  const anySucceeded = results.some((r) => r.status === 'fulfilled' && !r.value.error)

  if (!anySucceeded) {
    console.error('[newsletter] signup failed:', results)
    return NextResponse.json({ error: 'Signup failed' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
