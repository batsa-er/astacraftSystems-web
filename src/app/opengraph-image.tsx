import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0B0F14',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          padding: '80px',
          position: 'relative',
          fontFamily: 'Georgia, serif',
        }}
      >
        {/* Top accent bar */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: '#2563EB' }} />

        {/* Background grid lines for texture */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(37,99,235,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.04) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }} />

        {/* Glow */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0,
          width: '600px', height: '400px',
          background: 'radial-gradient(ellipse at bottom left, rgba(37,99,235,0.12) 0%, transparent 65%)',
        }} />

        {/* Wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '40px', position: 'relative' }}>
          <span style={{ fontSize: '26px', fontWeight: '700', color: 'white', letterSpacing: '-0.5px' }}>
            Astacraft
          </span>
          <span style={{ fontSize: '26px', fontWeight: '700', color: '#2563EB', letterSpacing: '-0.5px' }}>
            Systems
          </span>
        </div>

        {/* Headline */}
        <div style={{
          fontSize: '68px',
          fontWeight: '800',
          color: 'white',
          lineHeight: 1.0,
          letterSpacing: '-3px',
          marginBottom: '28px',
          position: 'relative',
        }}>
          Technology &amp;<br />Digital Transformation.
        </div>

        {/* Sub-line */}
        <div style={{
          fontSize: '20px',
          color: 'rgba(255,255,255,0.45)',
          fontFamily: 'monospace',
          letterSpacing: '1px',
          position: 'relative',
        }}>
          Software · Cloud · Cybersecurity · CRM/ERP · Ghana &amp; Africa
        </div>

        {/* URL bottom-right */}
        <div style={{
          position: 'absolute', bottom: '44px', right: '80px',
          fontSize: '13px', color: 'rgba(255,255,255,0.20)',
          fontFamily: 'monospace', letterSpacing: '2px',
        }}>
          astacraftsystems.com
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}
