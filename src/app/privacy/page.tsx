import PageHero from '@/components/PageHero'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Astacraft Systems',
  description: 'How Astacraft Systems collects, uses, and protects your personal information.',
  robots: { index: true, follow: true },
}

const sections = [
  {
    heading: 'Information We Collect',
    body: 'When you submit an enquiry through our contact form, we collect the personal information you provide: name, email address, phone number, company name, and the content of your message. We also collect standard server log data — IP address, browser type, and pages visited — for security and site performance purposes.',
  },
  {
    heading: 'How We Use Your Information',
    body: 'We use your information solely to respond to your enquiries, deliver services you have requested, and communicate about active projects. We do not sell, rent, or share your personal information with third parties for marketing or advertising purposes.',
  },
  {
    heading: 'Email and Communications',
    body: 'We use Resend to process and deliver email from our contact form. Messages are sent directly to our team and are not stored by any third-party marketing platform. You may opt out of non-essential communications at any time by emailing info@astacraftsystems.com.',
  },
  {
    heading: 'Data Retention',
    body: 'We retain contact enquiries and project records for the duration of our business relationship and for seven years thereafter, in line with Ghanaian business and tax regulations. You may request deletion of your personal data by contacting us directly — we will respond within 14 business days.',
  },
  {
    heading: 'Cookies',
    body: 'Our website uses only essential cookies required for basic site functionality. We do not use tracking cookies, advertising pixels, or third-party analytics services that collect personally identifiable information without your consent.',
  },
  {
    heading: 'Data Security',
    body: 'We apply appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. Our team follows documented security procedures and access controls for all client data.',
  },
  {
    heading: 'Your Rights',
    body: 'Under the Ghana Data Protection Act, 2012 (Act 843), you have the right to access, correct, or request deletion of personal data we hold about you. To exercise any of these rights, contact us at info@astacraftsystems.com with the subject line "Data Request." We will acknowledge your request within 5 business days.',
  },
  {
    heading: 'Third-Party Links',
    body: 'Our website may contain links to external sites. This Privacy Policy applies only to astacraftsystems.com. We are not responsible for the privacy practices of any third-party sites you visit through links on our pages.',
  },
  {
    heading: 'Changes to This Policy',
    body: 'We may update this Privacy Policy from time to time. Material changes will be reflected in the effective date below. Your continued use of our website after any update constitutes acceptance of the revised policy.',
  },
  {
    heading: 'Contact',
    body: 'Questions about this policy or how we handle your data: info@astacraftsystems.com — or write to Astacraft Systems Limited, Accra, Ghana.',
  },
]

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={<>Privacy Policy</>}
        description="How Astacraft Systems collects, uses, and protects your personal information. Last updated: January 2024."
      />

      <section className="bg-[var(--color-bg)] px-[clamp(24px,5vw,80px)] py-24">
        <div className="max-w-[800px] mx-auto space-y-12">
          {sections.map(({ heading, body }) => (
            <div key={heading}>
              <h2
                className="font-serif font-bold text-[var(--color-text)] mb-4"
                style={{ fontSize: 'clamp(20px,2vw,28px)' }}
              >
                {heading}
              </h2>
              <p className="text-[15px] text-[rgba(var(--ch-text),0.65)] leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
