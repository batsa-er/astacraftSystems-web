export function esc(v: string): string {
  return v
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function emailTable(rows: [string, string][]): string {
  return `<table style="width:100%;border-collapse:collapse">${rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 0;font-size:12px;color:#64748b;text-transform:uppercase;letter-spacing:0.1em;width:150px;vertical-align:top">${esc(label)}</td><td style="padding:8px 0;font-size:15px;white-space:pre-wrap">${esc(value)}</td></tr>`,
    )
    .join('')}</table>`
}

export function internalEmail(heading: string, rows: [string, string][], footer: string): string {
  return `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#0B0F14">
      <div style="background:#1D4776;padding:24px 32px">
        <h1 style="color:#fff;margin:0;font-size:20px;font-weight:600">${esc(heading)}</h1>
      </div>
      <div style="padding:32px;background:#F6F7FB;border:1px solid #e2e8f0">${emailTable(rows)}</div>
      <div style="padding:16px 32px;font-size:11px;color:#64748b;text-align:center">${esc(footer)}</div>
    </div>`
}
