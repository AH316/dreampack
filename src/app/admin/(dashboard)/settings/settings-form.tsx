'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { updateContactInfo, updateBusinessHours, updateSocialLinks, updateContactPage } from './actions'
import type { SiteSettingsData } from '@/lib/settings'

export function SettingsForm({ settings }: { settings: SiteSettingsData }) {
  const [contactInfo, setContactInfo] = useState(settings.contactInfo)
  const [businessHours, setBusinessHours] = useState(settings.businessHours)
  const [socialLinks, setSocialLinks] = useState(settings.socialLinks)
  const [contactPage, setContactPage] = useState(settings.contactPage)
  const [saving, setSaving] = useState<string | null>(null)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving('contact')
    setMessage(null)
    const result = await updateContactInfo(settings.id, contactInfo)
    if (result.success) {
      setMessage({ type: 'success', text: 'Contact info updated successfully' })
    } else {
      setMessage({ type: 'error', text: result.error || 'Failed to update' })
    }
    setSaving(null)
    setTimeout(() => setMessage(null), 3000)
  }

  const handleHoursSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving('hours')
    setMessage(null)
    const result = await updateBusinessHours(settings.id, businessHours)
    if (result.success) {
      setMessage({ type: 'success', text: 'Business hours updated successfully' })
    } else {
      setMessage({ type: 'error', text: result.error || 'Failed to update' })
    }
    setSaving(null)
    setTimeout(() => setMessage(null), 3000)
  }

  const handleSocialSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving('social')
    setMessage(null)
    const result = await updateSocialLinks(settings.id, socialLinks)
    if (result.success) {
      setMessage({ type: 'success', text: 'Social links updated successfully' })
    } else {
      setMessage({ type: 'error', text: result.error || 'Failed to update' })
    }
    setSaving(null)
    setTimeout(() => setMessage(null), 3000)
  }

  const handleContactPageSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving('contactPage')
    setMessage(null)
    const result = await updateContactPage(settings.id, contactPage)
    if (result.success) {
      setMessage({ type: 'success', text: 'Contact page updated successfully' })
    } else {
      setMessage({ type: 'error', text: result.error || 'Failed to update' })
    }
    setSaving(null)
    setTimeout(() => setMessage(null), 3000)
  }

  return (
    <div className="space-y-6">
      {message && (
        <div
          className={`p-4 rounded-lg ${
            message.type === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {message.text}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>
            Update your business contact details displayed throughout the site.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Main Phone</Label>
                <Input
                  id="phone"
                  value={contactInfo.phone}
                  onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                  placeholder="(973) 836-1100"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cell">Cell Phone</Label>
                <Input
                  id="cell"
                  value={contactInfo.cell}
                  onChange={(e) => setContactInfo({ ...contactInfo, cell: e.target.value })}
                  placeholder="(973) 727-7112"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={contactInfo.email}
                  onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                  placeholder="contact@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="whatsapp">WhatsApp Number</Label>
                <Input
                  id="whatsapp"
                  value={contactInfo.whatsapp}
                  onChange={(e) => setContactInfo({ ...contactInfo, whatsapp: e.target.value })}
                  placeholder="19737277112"
                />
                <p className="text-xs text-muted-foreground">
                  Include country code without + (e.g., 19737277112)
                </p>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Address / Location</Label>
                <Input
                  id="address"
                  value={contactInfo.address}
                  onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
                  placeholder="New Jersey"
                />
              </div>
            </div>
            <Button type="submit" disabled={saving === 'contact'}>
              {saving === 'contact' ? 'Saving...' : 'Save Contact Info'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Business Hours</CardTitle>
          <CardDescription>
            Set your business operating hours displayed on the contact page.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleHoursSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weekdaysLabel">Weekday Label</Label>
                <Input
                  id="weekdaysLabel"
                  value={businessHours.weekdaysLabel}
                  onChange={(e) => setBusinessHours({ ...businessHours, weekdaysLabel: e.target.value })}
                  placeholder="Monday - Friday"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weekdays">Weekday Hours</Label>
                <Input
                  id="weekdays"
                  value={businessHours.weekdays}
                  onChange={(e) => setBusinessHours({ ...businessHours, weekdays: e.target.value })}
                  placeholder="9:00 AM - 5:00 PM"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="saturdayLabel">Saturday Label</Label>
                <Input
                  id="saturdayLabel"
                  value={businessHours.saturdayLabel}
                  onChange={(e) => setBusinessHours({ ...businessHours, saturdayLabel: e.target.value })}
                  placeholder="Saturday"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="saturday">Saturday Hours</Label>
                <Input
                  id="saturday"
                  value={businessHours.saturday}
                  onChange={(e) => setBusinessHours({ ...businessHours, saturday: e.target.value })}
                  placeholder="By Appointment"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sundayLabel">Sunday Label</Label>
                <Input
                  id="sundayLabel"
                  value={businessHours.sundayLabel}
                  onChange={(e) => setBusinessHours({ ...businessHours, sundayLabel: e.target.value })}
                  placeholder="Sunday"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sunday">Sunday Hours</Label>
                <Input
                  id="sunday"
                  value={businessHours.sunday}
                  onChange={(e) => setBusinessHours({ ...businessHours, sunday: e.target.value })}
                  placeholder="Closed"
                />
              </div>
            </div>
            <Button type="submit" disabled={saving === 'hours'}>
              {saving === 'hours' ? 'Saving...' : 'Save Business Hours'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Social Links</CardTitle>
          <CardDescription>
            Add your social media profile URLs (optional).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSocialSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="facebook">Facebook</Label>
                <Input
                  id="facebook"
                  value={socialLinks.facebook || ''}
                  onChange={(e) => setSocialLinks({ ...socialLinks, facebook: e.target.value })}
                  placeholder="https://facebook.com/yourpage"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram</Label>
                <Input
                  id="instagram"
                  value={socialLinks.instagram || ''}
                  onChange={(e) => setSocialLinks({ ...socialLinks, instagram: e.target.value })}
                  placeholder="https://instagram.com/yourpage"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter / X</Label>
                <Input
                  id="twitter"
                  value={socialLinks.twitter || ''}
                  onChange={(e) => setSocialLinks({ ...socialLinks, twitter: e.target.value })}
                  placeholder="https://twitter.com/yourpage"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  value={socialLinks.linkedin || ''}
                  onChange={(e) => setSocialLinks({ ...socialLinks, linkedin: e.target.value })}
                  placeholder="https://linkedin.com/company/yourpage"
                />
              </div>
            </div>
            <Button type="submit" disabled={saving === 'social'}>
              {saving === 'social' ? 'Saving...' : 'Save Social Links'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Page Content</CardTitle>
          <CardDescription>
            Edit the text displayed on the Contact page.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleContactPageSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pageTitle">Page Title</Label>
                <Input
                  id="pageTitle"
                  value={contactPage.title}
                  onChange={(e) => setContactPage({ ...contactPage, title: e.target.value })}
                  placeholder="Contact Us"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pageSubtitle">Page Subtitle</Label>
                <Input
                  id="pageSubtitle"
                  value={contactPage.subtitle}
                  onChange={(e) => setContactPage({ ...contactPage, subtitle: e.target.value })}
                  placeholder="We are here to help..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="getInTouchTitle">Get In Touch Title</Label>
                <Input
                  id="getInTouchTitle"
                  value={contactPage.getInTouchTitle}
                  onChange={(e) => setContactPage({ ...contactPage, getInTouchTitle: e.target.value })}
                  placeholder="Get In Touch"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quickContactTitle">Quick Contact Title</Label>
                <Input
                  id="quickContactTitle"
                  value={contactPage.quickContactTitle}
                  onChange={(e) => setContactPage({ ...contactPage, quickContactTitle: e.target.value })}
                  placeholder="Quick Contact"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="quickContactText">Quick Contact Description</Label>
                <Textarea
                  id="quickContactText"
                  value={contactPage.quickContactText}
                  onChange={(e) => setContactPage({ ...contactPage, quickContactText: e.target.value })}
                  placeholder="The fastest way to reach us is by phone..."
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quoteTitle">Request a Quote Title</Label>
                <Input
                  id="quoteTitle"
                  value={contactPage.quoteTitle}
                  onChange={(e) => setContactPage({ ...contactPage, quoteTitle: e.target.value })}
                  placeholder="Request a Quote"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="offeringsTitle">What We Offer Title</Label>
                <Input
                  id="offeringsTitle"
                  value={contactPage.offeringsTitle}
                  onChange={(e) => setContactPage({ ...contactPage, offeringsTitle: e.target.value })}
                  placeholder="What We Offer"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="quoteText">Request a Quote Description</Label>
                <Textarea
                  id="quoteText"
                  value={contactPage.quoteText}
                  onChange={(e) => setContactPage({ ...contactPage, quoteText: e.target.value })}
                  placeholder="Send us an email with your requirements..."
                  rows={2}
                />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              The "What We Offer" list is shared with the About page. Edit it in Pages &gt; About.
            </p>
            <Button type="submit" disabled={saving === 'contactPage'}>
              {saving === 'contactPage' ? 'Saving...' : 'Save Contact Page'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
