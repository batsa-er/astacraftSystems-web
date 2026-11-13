// Vercel sets VERCEL_ENV; SITE_ENV=production lets any other host opt in.
export const IS_PRODUCTION_SITE =
  process.env.VERCEL_ENV === 'production' || process.env.SITE_ENV === 'production'
