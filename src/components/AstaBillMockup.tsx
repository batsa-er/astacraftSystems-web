import Image from 'next/image'

const NAV = ['Overview', 'Invoices', 'Payments', 'Clients', 'Reports']

const KPIS = [
  { label: 'Total Revenue',   val: 'GH₵ 84,200', sub: '↑ 14% vs last month', green: true  },
  { label: 'Outstanding',     val: 'GH₵ 12,500', sub: '3 invoices pending',  green: false },
  { label: 'Paid This Month', val: 'GH₵ 31,700', sub: '↑ 8% vs last month',  green: true  },
]

const INVOICES = [
  { id: 'INV-0042', client: 'Sample Client A', amount: 'GH₵ 4,800', status: 'Paid' },
  { id: 'INV-0041', client: 'Sample Client B', amount: 'GH₵ 2,200', status: 'Pending' },
  { id: 'INV-0040', client: 'Sample Client C', amount: 'GH₵ 7,500', status: 'Paid' },
  { id: 'INV-0039', client: 'Sample Client D', amount: 'GH₵ 1,950', status: 'Overdue' },
]

const statusCls: Record<string, string> = {
  Paid:    'text-[#8EDB7C] bg-[rgba(104,202,80,0.10)] border-[rgba(104,202,80,0.30)]',
  Pending: 'text-[#FBBF24] bg-[rgba(217,119,6,0.12)] border-[rgba(217,119,6,0.35)]',
  Overdue: 'text-[#FCA5A5] bg-[rgba(248,113,113,0.10)] border-[rgba(248,113,113,0.30)]',
}

export function AstaBillMockup() {
  return (
    <figure className="m-0">
      <div
        role="img"
        aria-label="Illustration of the AstaBill dashboard showing sample data: revenue totals, a revenue chart and a list of invoices"
        className="border border-[rgba(255,255,255,0.10)] bg-[#12233D] shadow-2xl overflow-hidden"
      >
        <div aria-hidden="true">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-[rgba(255,255,255,0.06)]">
            <span className="w-2 h-2 rounded-full bg-[rgba(255,80,80,0.40)]" />
            <span className="w-2 h-2 rounded-full bg-[rgba(255,180,0,0.30)]" />
            <span className="w-2 h-2 rounded-full bg-[rgba(104,202,80,0.30)]" />
            <div className="ml-3 flex-1 min-w-0 bg-[rgba(255,255,255,0.05)] px-3 py-1">
              <span className="font-mono text-[10px] text-[rgba(255,255,255,0.45)] tracking-wide truncate block">astabill.com/dashboard</span>
            </div>
            <span className="font-mono text-[9px] tracking-[0.14em] uppercase text-white border border-[rgba(255,255,255,0.45)] px-2 py-1 shrink-0">Sample data</span>
          </div>

          <div className="flex">
            <div className="hidden sm:flex w-[140px] shrink-0 border-r border-[rgba(255,255,255,0.05)] bg-[rgba(0,0,0,0.15)] flex-col pt-5 pb-4 px-3">
              <div className="px-1.5 mb-5">
                <Image src="/astabill-logo-white.svg" alt="" width={76} height={20} className="h-[18px] w-auto opacity-80" />
              </div>
              <div className="flex flex-col gap-0.5">
                {NAV.map((label, i) => (
                  <div key={label} className={`flex items-center gap-2.5 px-2.5 py-[7px] ${i === 0 ? 'bg-[rgba(255,255,255,0.08)] text-white' : 'text-[rgba(255,255,255,0.45)]'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${i === 0 ? 'bg-[#68CA50]' : 'bg-[rgba(255,255,255,0.15)]'}`} />
                    <span className="font-mono text-[10px] tracking-[0.05em]">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 flex flex-col min-w-0">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-[rgba(255,255,255,0.05)]">
                <p className="font-mono text-[11px] font-medium text-white tracking-[0.03em]">Overview</p>
                <div className="bg-[#2F7D32] px-3 py-1.5">
                  <span className="font-mono text-[9px] text-white tracking-[0.10em] uppercase font-medium">+ New Invoice</span>
                </div>
              </div>

              <div className="grid grid-cols-3 border-b border-[rgba(255,255,255,0.05)]">
                {KPIS.map(({ label, val, sub, green }, i) => (
                  <div key={label} className={`px-3 py-3 min-w-0 ${i > 0 ? 'border-l border-[rgba(255,255,255,0.05)]' : ''}`}>
                    <p className="font-mono text-[8px] tracking-[0.10em] uppercase text-[rgba(255,255,255,0.50)] mb-1.5 truncate">{label}</p>
                    <p className="font-serif text-[13px] sm:text-[15px] font-bold text-white leading-none mb-1 whitespace-nowrap">{val}</p>
                    <p className={`font-mono text-[8px] sm:text-[9px] truncate ${green ? 'text-[#8EDB7C]' : 'text-[#FBBF24]'}`}>{sub}</p>
                  </div>
                ))}
              </div>

              <div className="px-4 pt-3 pb-4 flex flex-col gap-3">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-[8px] tracking-[0.14em] uppercase text-[rgba(255,255,255,0.50)]">Revenue, Jan to Jun</span>
                  </div>
                  <svg viewBox="0 0 400 48" preserveAspectRatio="none" className="w-full h-12">
                    <path d="M8,44 L88,36 L168,28 L248,20 L328,12 L392,6 L392,48 L8,48 Z" fill="rgba(104,202,80,0.12)" />
                    <path d="M8,44 L88,36 L168,28 L248,20 L328,12 L392,6" fill="none" stroke="#68CA50" strokeWidth="1.5" strokeOpacity="0.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                <div className="border border-[rgba(255,255,255,0.06)]">
                  {INVOICES.map(inv => (
                    <div key={inv.id} className="grid grid-cols-[1fr_auto_auto] gap-3 items-center px-3 py-2.5 border-b border-[rgba(255,255,255,0.04)] last:border-0">
                      <div className="min-w-0">
                        <p className="font-mono text-[10px] text-white leading-none mb-0.5 truncate">{inv.client}</p>
                        <p className="font-mono text-[8px] text-[rgba(255,255,255,0.45)]">{inv.id}</p>
                      </div>
                      <span className="font-mono text-[10px] text-white whitespace-nowrap">{inv.amount}</span>
                      <span className={`font-mono text-[8px] tracking-[0.10em] uppercase px-1.5 py-0.5 border w-fit ${statusCls[inv.status]}`}>{inv.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 font-mono text-[10px] tracking-[0.10em] uppercase text-[rgba(255,255,255,0.70)]">
        Illustration with sample data, not a real account.
      </figcaption>
    </figure>
  )
}
