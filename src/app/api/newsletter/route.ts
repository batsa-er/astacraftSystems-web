import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const resend = new Resend(process.env.RESEND_API_KEY)

const schema = z.object({
  email: z.string().email().max(254),
  name:  z.string().max(100).optional(),
})

export async function POST(req: Request) {
  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })

  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Invalid email' }, { status: 400 })

  const { email, name } = parsed.data
  const audienceId = process.env.RESEND_AUDIENCE_ID
  const FROM = process.env.RESEND_FROM_EMAIL ?? 'Astacraft Systems <onboarding@resend.dev>'
  const TO = process.env.CONTACT_TO_EMAIL!

  const tasks: Promise<unknown>[] = []

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
          <p style="font-size:14px;color:#475569;margin:0">Email: <a href="mailto:${email}" style="color:#1D4776">${email}</a></p>
          ${name ? `<p style="font-size:14px;color:#475569;margin:4px 0 0">Name: ${name}</p>` : ''}
          <p style="font-size:11px;color:#94a3b8;margin:20px 0 0">Source: The Infrastructure Brief signup — astacraftsystems.com</p>
        </div>
      `,
    })
  )

  await Promise.allSettled(tasks)

  return NextResponse.json({ ok: true })
}
