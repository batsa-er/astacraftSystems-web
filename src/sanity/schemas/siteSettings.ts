import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'heroSlides',
      title: 'Hero Slides',
      type: 'array',
      description: 'Images that cycle in the homepage hero (4 recommended). Falls back to defaults if empty.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
            defineField({ name: 'alt', title: 'Alt text', type: 'string' }),
          ],
          preview: {
            select: { title: 'alt', media: 'image' },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            prepare({ title, media }: { title?: string; media?: any }) {
              return { title: title || 'Slide', media }
            },
          },
        },
      ],
    }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'phone', title: 'Phone Number', type: 'string', description: 'e.g. "+233 XX XXX XXXX"' }),
    defineField({
      name: 'address', title: 'Address', type: 'string',
      description: 'e.g. "Accra, Ghana · Remote-first"',
    }),
    defineField({
      name: 'responseTime', title: 'Response Time', type: 'string',
      description: 'e.g. "Within 24 hours"',
    }),
    defineField({ name: 'linkedinUrl', title: 'LinkedIn URL', type: 'url' }),
    defineField({ name: 'twitterUrl', title: 'X / Twitter URL', type: 'url' }),
    defineField({ name: 'facebookUrl', title: 'Facebook URL', type: 'url' }),
    defineField({ name: 'instagramUrl', title: 'Instagram URL', type: 'url' }),
  ],
})
