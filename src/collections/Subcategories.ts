import type { CollectionConfig } from 'payload'

export const Subcategories: CollectionConfig = {
  slug: 'subcategories',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'parentCategory', 'slug', 'order'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'e.g., Twisted Handle',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'Auto-generated from name',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.name) {
              return data.name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-|-$/g, '')
            }
            return value
          },
        ],
      },
    },
    {
      name: 'parentCategory',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      admin: {
        description: 'Parent category',
      },
    },
    {
      name: 'prefix',
      type: 'text',
      required: true,
      maxLength: 5,
      admin: {
        description: 'SKU prefix (e.g., TW for Twisted)',
        placeholder: 'TW',
      },
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Display order within category',
      },
    },
  ],
}
