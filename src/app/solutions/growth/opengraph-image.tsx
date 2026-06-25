import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div style={{ background: '#0A1628', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-end', padding: '80px', position: 'relative', fontFamily: 'Georgia, serif' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: '#1D4776' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(29,71,118,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(29,71,118,0.05) 1px, transparent 1px)', backgroundSize: '64px 64px' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '600px', height: '400px', background: 'radial-gradient(ellipse at bottom left, rgba(29,71,118,0.15) 0%, transparent 65%)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px', position: 'relative' }}>
          <span style={{ fontSize: '22px', fontWeight: '700', color: 'white', letterSpacing: '-0.5px' }}>Astacraft</span>
          <span style={{ fontSize: '22px', fontWeight: '700', color: '#4A8FD4', letterSpacing: '-0.5px' }}>Systems</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', position: 'relative' }}>
          <span style={{ fontSize: '11px', fontFamily: 'monospace', letterSpacing: '3px', textTransform: 'uppercase', color: '#4A8FD4', border: '1px solid rgba(29,71,118,0.60)', padding: '4px 12px' }}>SMEs</span>
        </div>
        <div style={{ fontSize: '72px', fontWeight: '800', color: 'white', lineHeight: 1.0, letterSpacing: '-3px', marginBottom: '24px', position: 'relative' }}>
          Astacraft Growth™
        </div>
        <div style={{ fontSize: '20px', color: 'rgba(255,255,255,0.45)', fontFamily: 'monospace', letterSpacing: '0.5px', position: 'relative' }}>
          CRM · Automation · Collaboration · Email Marketing
        </div>
        <div style={{ display: 'flex', gap: '32px', marginTop: '32px', position: 'relative' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '28px', fontWeight: '800', color: 'white' }}>GH₵ 5,500</span>
            <span style={{ fontSize: '11px', fontFamily: 'monospace', color: 'rgba(255,255,255,0.30)', letterSpacing: '1px' }}>FROM / SETUP</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '28px', fontWeight: '800', color: 'white' }}>GH₵ 1,500</span>
            <span style={{ fontSize: '11px', fontFamily: 'monospace', color: 'rgba(255,255,255,0.30)', letterSpacing: '1px' }}>FROM / MONTH</span>
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: '44px', right: '80px', fontSize: '12px', color: 'rgba(255,255,255,0.18)', fontFamily: 'monospace', letterSpacing: '2px' }}>astacraftsystems.com/solutions/growth</div>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}
