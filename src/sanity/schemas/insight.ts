import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'insight',
  title: 'Insight',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'tag', title: 'Tag (category)', type: 'string' }),
    defineField({ name: 'label', title: 'Label (sub-tag)', type: 'string' }),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3 }),
    defineField({ name: 'body', title: 'Body', type: 'text', rows: 20 }),
    defineField({ name: 'publishedAt', title: 'Published At', type: 'date' }),
    defineField({ name: 'readTime', title: 'Read Time', type: 'string', placeholder: 'e.g. 8 min read' }),
    defineField({ name: 'coverImage', title: 'Cover Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'published', title: 'Published', type: 'boolean', initialValue: true }),
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
  preview: { select: { title: 'title', subtitle: 'tag', media: 'coverImage' } },
})
