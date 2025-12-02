import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'sku', 'category', 'status', 'featured'],
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
        placeholder: 'e.g., Kraft Paper Bag - Large',
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
      name: 'sku',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'e.g., PB-TW-001',
        placeholder: 'PB-TW-001',
      },
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      maxLength: 200,
      admin: {
        placeholder: 'Brief description for search results and cards',
      },
    },
    {
      name: 'description',
      type: 'richText',
      admin: {
        description: 'Full product description with features and use cases',
      },
    },
    {
      name: 'images',
      type: 'array',
      minRows: 1,
      admin: {
        description: 'Product images (first one is the main image)',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
    },
    {
      name: 'subcategory',
      type: 'relationship',
      relationTo: 'subcategories',
      filterOptions: ({ data }) => {
        if (data?.category) {
          return {
            parentCategory: {
              equals: typeof data.category === 'string' ? data.category : data.category.id,
            },
          }
        }
        return {}
      },
    },
    // Pricing (optional per product)
    {
      name: 'pricing',
      type: 'group',
      admin: {
        description: 'Pricing settings',
      },
      fields: [
        {
          name: 'showPrice',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Show price on website (if off, shows "Request Quote")',
          },
        },
        {
          name: 'price',
          type: 'number',
          min: 0,
          admin: {
            condition: (data, siblingData) => siblingData?.showPrice,
            placeholder: '0.00',
          },
        },
        {
          name: 'unit',
          type: 'select',
          options: [
            { label: 'per piece', value: 'per_piece' },
            { label: 'per case', value: 'per_case' },
            { label: 'per 1000', value: 'per_1000' },
            { label: 'per roll', value: 'per_roll' },
          ],
          defaultValue: 'per_piece',
          admin: {
            condition: (data, siblingData) => siblingData?.showPrice,
          },
        },
        {
          name: 'minimumOrder',
          type: 'number',
          min: 1,
          admin: {
            placeholder: 'Minimum order quantity',
          },
        },
      ],
    },
    // Filterable Attributes
    {
      name: 'material',
      type: 'select',
      options: [
        { label: 'Paper', value: 'paper' },
        { label: 'Plastic', value: 'plastic' },
        { label: 'Non-Woven', value: 'non_woven' },
        { label: 'Biodegradable', value: 'biodegradable' },
        { label: 'PVC', value: 'pvc' },
        { label: 'LDPE', value: 'ldpe' },
        { label: 'HDPE', value: 'hdpe' },
        { label: 'Foam', value: 'foam' },
      ],
      admin: {
        description: 'Primary material (for filtering)',
      },
    },
    {
      name: 'sizes',
      type: 'array',
      admin: {
        description: 'Available sizes',
      },
      fields: [
        {
          name: 'size',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'e.g., 10x5x13 inches',
          },
        },
      ],
    },
    {
      name: 'stockStatus',
      type: 'select',
      options: [
        { label: 'In Stock', value: 'in_stock' },
        { label: 'Contact for Availability', value: 'contact' },
        { label: 'Made to Order', value: 'made_to_order' },
      ],
      defaultValue: 'in_stock',
      admin: {
        position: 'sidebar',
      },
    },
    // Specifications
    {
      name: 'specifications',
      type: 'array',
      admin: {
        description: 'Technical specifications',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'e.g., Weight',
          },
        },
        {
          name: 'value',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'e.g., 70 GSM',
          },
        },
      ],
    },
    // FAQ
    {
      name: 'faq',
      type: 'array',
      admin: {
        description: 'Common questions about this product',
      },
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          type: 'textarea',
          required: true,
        },
      ],
    },
    // Status
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
      ],
      defaultValue: 'draft',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Show on homepage',
      },
    },
    // SEO
    {
      name: 'seo',
      type: 'group',
      admin: {
        description: 'SEO settings (auto-generated if empty)',
      },
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          maxLength: 60,
          admin: {
            placeholder: 'Auto-generated from product name',
          },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          maxLength: 160,
          admin: {
            placeholder: 'Auto-generated from short description',
          },
        },
      ],
    },
  ],
}
