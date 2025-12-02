import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      defaultValue: 'DreamPack',
    },
    {
      name: 'tagline',
      type: 'text',
      defaultValue: 'Smart Solutions',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'favicon',
      type: 'upload',
      relationTo: 'media',
    },
    // Contact Information
    {
      name: 'contact',
      type: 'group',
      fields: [
        {
          name: 'phone',
          type: 'text',
          defaultValue: '(973) 836-1100',
        },
        {
          name: 'cell',
          type: 'text',
          defaultValue: '(973) 727-7112',
        },
        {
          name: 'whatsapp',
          type: 'text',
          admin: {
            description: 'WhatsApp number with country code (e.g., +19737277112)',
          },
        },
        {
          name: 'email',
          type: 'email',
          defaultValue: 'aipek@dreampackss.com',
        },
        {
          name: 'address',
          type: 'textarea',
        },
        {
          name: 'businessHours',
          type: 'text',
          admin: {
            placeholder: 'e.g., Mon-Fri 9AM-5PM EST',
          },
        },
      ],
    },
    // Social Media
    {
      name: 'social',
      type: 'group',
      fields: [
        {
          name: 'facebook',
          type: 'text',
        },
        {
          name: 'instagram',
          type: 'text',
        },
        {
          name: 'linkedin',
          type: 'text',
        },
        {
          name: 'youtube',
          type: 'text',
        },
      ],
    },
    // Trust Signals
    {
      name: 'trustSignals',
      type: 'group',
      fields: [
        {
          name: 'yearsInBusiness',
          type: 'number',
          admin: {
            description: 'How many years in business (for "Serving since...")',
          },
        },
        {
          name: 'customersServed',
          type: 'text',
          admin: {
            placeholder: 'e.g., 500+',
          },
        },
      ],
    },
    // PDF Catalogue
    {
      name: 'cataloguePdf',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Downloadable PDF catalogue',
      },
    },
  ],
}
