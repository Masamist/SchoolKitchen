import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'category',
  title: 'Categories',
  type: 'document',
  fields: [
    defineField({
      name: 'catId',
      title: 'ID',
      type: 'number',
    }),
    defineField({
      name: 'name',
      title: 'Category Name',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Category Image',
      type: 'image',
    }),
  ],
})
