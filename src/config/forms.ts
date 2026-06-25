export const CONTACT_SERVICES = [
  { value: 'bundle-launch',          label: 'Astacraft Launch™ Bundle' },
  { value: 'bundle-growth',          label: 'Astacraft Growth™ Bundle' },
  { value: 'bundle-operations',      label: 'Astacraft Operations™ Bundle' },
  { value: 'bundle-secure',          label: 'Astacraft Secure™ Bundle' },
  { value: 'bundle-enterprise',      label: 'Astacraft Enterprise™ Bundle' },
  { value: 'astabill',               label: 'AstaBill — Billing & Payments' },
  { value: 'software-development',   label: 'Software Development' },
  { value: 'api-automation',         label: 'API & Automation' },
  { value: 'crm-erp',                label: 'CRM & ERP Systems' },
  { value: 'digital-transformation', label: 'Digital Transformation' },
  { value: 'cloud-solutions',        label: 'Cloud & Infrastructure' },
  { value: 'cybersecurity',          label: 'Cybersecurity' },
  { value: 'it-consulting',          label: 'IT Strategy & Advisory' },
  { value: 'other',                  label: 'Not sure yet' },
]

export const BUNDLE_SERVICE_MAP: Record<string, string> = {
  launch:      'bundle-launch',
  growth:      'bundle-growth',
  operations:  'bundle-operations',
  secure:      'bundle-secure',
  enterprise:  'bundle-enterprise',
}

export const BUNDLE_LABEL_MAP: Record<string, string> = {
  launch:      'Astacraft Launch™',
  growth:      'Astacraft Growth™',
  operations:  'Astacraft Operations™',
  secure:      'Astacraft Secure™',
  enterprise:  'Astacraft Enterprise™',
}

export const CONTACT_BUDGETS = [
  { value: 'under-10k',  label: 'Under GH₵ 10,000' },
  { value: '10k-50k',    label: 'GH₵ 10,000 – 50,000' },
  { value: '50k-200k',   label: 'GH₵ 50,000 – 200,000' },
  { value: '200k-plus',  label: 'GH₵ 200,000+' },
  { value: 'not-sure',   label: 'Not sure yet' },
]
