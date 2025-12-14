import { db } from '@/db'
import { siteSettings, type ContactInfo, type BusinessHours, type AboutPageContent, type ContactPageContent } from '@/db/schema'
import { unstable_cache } from 'next/cache'

export type SiteSettingsData = {
  id: string
  siteName: string
  contactInfo: ContactInfo
  businessHours: BusinessHours
  aboutPage: AboutPageContent
  contactPage: ContactPageContent
  socialLinks: {
    facebook?: string
    instagram?: string
    twitter?: string
    linkedin?: string
  }
}

// Default values used when no settings exist in DB
const defaultSettings: Omit<SiteSettingsData, 'id'> = {
  siteName: 'DreamPack',
  contactInfo: {
    phone: '(973) 836-1100',
    cell: '(973) 727-7112',
    email: 'aipek@dreampackss.com',
    whatsapp: '19737277112',
    address: 'New Jersey',
  },
  businessHours: {
    weekdaysLabel: 'Monday - Friday',
    weekdays: '9:00 AM - 5:00 PM',
    saturdayLabel: 'Saturday',
    saturday: 'By Appointment',
    sundayLabel: 'Sunday',
    sunday: 'Closed',
  },
  aboutPage: {
    heroText: 'Your trusted partner for quality packaging solutions, serving New York, New Jersey, and all of North America since 2010.',
    storyTitle: 'Our Story',
    storyContent: 'DreamPack has been a leading supplier of quality packaging products for over a decade. What started as a small family business has grown into a trusted partner for businesses across North America.\n\nWe take pride in offering a wide range of packaging solutions, from eco-friendly paper bags to elegant gift boxes. Our commitment to quality, competitive pricing, and exceptional customer service has made us the go-to choice for businesses of all sizes.',
    values: [
      { title: 'Quality Products', description: 'We source and provide only the highest quality packaging materials to ensure your products are presented at their best.', icon: 'shield' },
      { title: 'Competitive Pricing', description: 'As a wholesale supplier, we offer competitive bulk pricing without compromising on quality.', icon: 'dollar' },
      { title: 'Customer Service', description: 'Our dedicated team is always ready to help you find the perfect packaging solution for your needs.', icon: 'users' },
      { title: 'Fast Delivery', description: 'We maintain extensive inventory to ensure quick turnaround times for your orders.', icon: 'truck' },
    ],
    offerings: [
      'Paper Bags & Shopping Bags',
      'Food Packaging & Containers',
      'Gift Boxes & Tissue Paper',
      'Poly Bags & Plastic Packaging',
      'Custom Printing Services',
      'Eco-Friendly Options',
    ],
    ctaTitle: 'Ready to Get Started?',
    ctaText: 'Contact us today for a quote on your packaging needs.',
  },
  contactPage: {
    title: 'Contact Us',
    subtitle: 'We are here to help with all your packaging needs',
    getInTouchTitle: 'Get In Touch',
    quickContactTitle: 'Quick Contact',
    quickContactText: 'The fastest way to reach us is by phone. We are ready to help with your packaging needs.',
    quoteTitle: 'Request a Quote',
    quoteText: 'Send us an email with your requirements and we will get back to you with pricing.',
    offeringsTitle: 'What We Offer',
  },
  socialLinks: {},
}

async function fetchSettings(): Promise<SiteSettingsData> {
  const settings = await db.select().from(siteSettings).limit(1)

  if (settings.length === 0) {
    // Create default settings if none exist
    const [newSettings] = await db.insert(siteSettings).values({}).returning()
    return {
      id: newSettings.id,
      siteName: newSettings.siteName,
      contactInfo: (newSettings.contactInfo as ContactInfo) ?? defaultSettings.contactInfo,
      businessHours: (newSettings.businessHours as BusinessHours) ?? defaultSettings.businessHours,
      aboutPage: (newSettings.aboutPage as AboutPageContent) ?? defaultSettings.aboutPage,
      contactPage: (newSettings.contactPage as ContactPageContent) ?? defaultSettings.contactPage,
      socialLinks: newSettings.socialLinks ?? defaultSettings.socialLinks,
    }
  }

  const s = settings[0]
  return {
    id: s.id,
    siteName: s.siteName,
    contactInfo: (s.contactInfo as ContactInfo) ?? defaultSettings.contactInfo,
    businessHours: (s.businessHours as BusinessHours) ?? defaultSettings.businessHours,
    aboutPage: (s.aboutPage as AboutPageContent) ?? defaultSettings.aboutPage,
    contactPage: (s.contactPage as ContactPageContent) ?? defaultSettings.contactPage,
    socialLinks: s.socialLinks ?? defaultSettings.socialLinks,
  }
}

// Cached version for frontend pages
export const getSettings = unstable_cache(
  fetchSettings,
  ['site-settings'],
  { revalidate: 60, tags: ['settings'] }
)

// Uncached version for admin pages
export const getSettingsUncached = fetchSettings
