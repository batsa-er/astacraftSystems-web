export const SITE = {
  company: 'Astacraft Systems Limited',
  companyShort: 'Astacraft Systems',
  brand: 'Astacraft',
  url: 'https://astacraftsystems.com',
  email: 'info@astacraftsystems.com',
  phone: '+233 24 918 7555',
  address: {
    street: 'Sam Nujoma Street',
    area: 'North Ridge',
    city: 'Accra',
    region: 'Greater Accra',
    country: 'GH',
  },
  whatsapp: {
    // Digits only, with country code. Set isPlaceholder to false once the real number is in.
    number: '233000000000',
    isPlaceholder: true,
  },
}

export const PRODUCTS = {
  astabill: { name: 'AstaBill', url: 'https://astabill.com' },
  dondo: { name: 'Dondo', path: '/dondo' },
} as const

export const ADDRESS_LINE = `${SITE.address.street}, ${SITE.address.area}, ${SITE.address.city}`
export const WHATSAPP_URL = `https://wa.me/${SITE.whatsapp.number}`
export const PHONE_HREF = `tel:${SITE.phone.replace(/\s/g, '')}`
