import PageHero from '@/components/PageHero'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Use | Astacraft Systems',
  description: 'Terms governing use of the Astacraft Systems website and services.',
  robots: { index: true, follow: true },
}

const sections = [
  {
    heading: 'Acceptance of Terms',
    body: 'By accessing or using astacraftsystems.com, you agree to be bound by these Terms of Use. If you do not agree, please discontinue use of the site. These terms apply to all visitors, clients, and others who access or use the site.',
  },
  {
    heading: 'Use of This Website',
    body: 'You may use this website for lawful purposes only. You must not use it in any way that breaches applicable local, national, or international laws or regulations, or in any way that is fraudulent, harmful, or that transmits unsolicited commercial communications. You must not attempt to gain unauthorised access to any part of the site or its underlying systems.',
  },
  {
    heading: 'Intellectual Property',
    body: 'All content on this website — including text, graphics, logos, images, and software — is the property of Astacraft Systems Limited or its content suppliers and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.',
  },
  {
    heading: 'Service Engagements',
    body: 'The content on this site is for general information purposes only. It does not constitute a binding service offer. All consulting, software development, and managed service engagements are governed by separate written agreements entered into between Astacraft Systems Limited and the client. Nothing on this site creates a contractual obligation on our part.',
  },
  {
    heading: 'Accuracy of Information',
    body: 'We make reasonable efforts to keep the information on this site accurate and up to date. However, we make no warranties — express or implied — about the completeness, accuracy, reliability, or suitability of any information. Any reliance you place on such information is strictly at your own risk.',
  },
  {
    heading: 'Limitation of Liability',
    body: 'To the fullest extent permitted by applicable law, Astacraft Systems Limited will not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of, or inability to use, this website or its content. Our total liability for any claim arising from use of this site shall not exceed GH₵ 500.',
  },
  {
    heading: 'External Links',
    body: 'This website may contain links to external websites. These links are provided for convenience only. Astacraft Systems Limited has no control over the content of those sites and accepts no responsibility for them or for any loss or damage that may arise from your use of them.',
  },
  {
    heading: 'Governing Law',
    body: 'These Terms of Use are governed by and construed in accordance with the laws of the Republic of Ghana. Any disputes arising in connection with these terms shall be subject to the exclusive jurisdiction of the courts of Ghana.',
  },
  {
    heading: 'Changes to These Terms',
    body: 'We reserve the right to update these Terms of Use at any time. Changes take effect immediately upon posting to this page. Your continued use of the site constitutes acceptance of the updated terms.',
  },
  {
    heading: 'Contact',
    body: 'Questions about these terms: info@astacraftsystems.com — or write to Astacraft Systems Limited, Accra, Ghana.',
  },
]

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={<>Terms of Use</>}
        description="Terms governing use of the Astacraft Systems website. Last updated: January 2024."
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
