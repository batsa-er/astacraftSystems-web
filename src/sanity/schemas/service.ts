import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({ name: 'title',    title: 'Title',            type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug',     title: 'Slug',             type: 'slug',   options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'number',   title: 'Display Number',   type: 'string', placeholder: '01' }),
    defineField({ name: 'tagline',  title: 'Tagline',          type: 'string' }),
    defineField({ name: 'description', title: 'Description',   type: 'text',   rows: 4 }),
    defineField({ name: 'detail',   title: 'Detailed Description', type: 'text', rows: 8 }),
    defineField({ name: 'outcomes', title: 'Outcomes / Deliverables', type: 'array', of: [{ type: 'string' }] }),
    defineField({
      name: 'process',
      title: 'Engagement Process Steps',
      description: 'Up to 6 steps shown in the "How We Work" section.',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'stats',
      title: 'Headline Stats',
      description: 'Three numbers shown in the stats strip (e.g. "200+" / "Systems built").',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'num',   title: 'Number / Value', type: 'string', placeholder: '200+' }),
          defineField({ name: 'label', title: 'Label',          type: 'string', placeholder: 'Systems built' }),
        ],
        preview: { select: { title: 'num', subtitle: 'label' } },
      }],
    }),
    defineField({ name: 'price', title: 'Price Label', type: 'string', placeholder: 'From $8,000 / mo' }),
    defineField({ name: 'order', title: 'Order',       type: 'number' }),
    defineField({
      name: 'faq',
      title: 'FAQ',
      description: 'Frequently asked questions shown at the bottom of the service page. Each entry becomes a FAQPage rich result in Google.',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'q', title: 'Question', type: 'string', validation: r => r.required() }),
          defineField({ name: 'a', title: 'Answer',   type: 'text',   rows: 4, validation: r => r.required() }),
        ],
        preview: { select: { title: 'q', subtitle: 'a' } },
      }],
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'Overrides the page title in search results. 50–60 characters recommended.',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      description: 'Overrides the meta description in search results. 140–160 characters recommended.',
    }),
  ],
  preview: { select: { title: 'title', subtitle: 'tagline' } },
})
