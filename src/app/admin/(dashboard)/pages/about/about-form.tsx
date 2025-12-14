'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { updateAboutPage } from './actions'
import type { AboutPageContent } from '@/db/schema'
import { Plus, Trash2 } from 'lucide-react'

interface AboutFormProps {
  settingsId: string
  aboutPage: AboutPageContent
}

export function AboutForm({ settingsId, aboutPage }: AboutFormProps) {
  const [data, setData] = useState<AboutPageContent>(aboutPage)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage(null)
    const result = await updateAboutPage(settingsId, data)
    if (result.success) {
      setMessage({ type: 'success', text: 'About page updated successfully' })
    } else {
      setMessage({ type: 'error', text: result.error || 'Failed to update' })
    }
    setSaving(false)
    setTimeout(() => setMessage(null), 3000)
  }

  const addValue = () => {
    setData({
      ...data,
      values: [...data.values, { title: '', description: '', icon: 'shield' }],
    })
  }

  const removeValue = (index: number) => {
    setData({
      ...data,
      values: data.values.filter((_, i) => i !== index),
    })
  }

  const updateValue = (index: number, field: 'title' | 'description' | 'icon', value: string) => {
    const newValues = [...data.values]
    newValues[index] = { ...newValues[index], [field]: value }
    setData({ ...data, values: newValues })
  }

  const addOffering = () => {
    setData({
      ...data,
      offerings: [...data.offerings, ''],
    })
  }

  const removeOffering = (index: number) => {
    setData({
      ...data,
      offerings: data.offerings.filter((_, i) => i !== index),
    })
  }

  const updateOffering = (index: number, value: string) => {
    const newOfferings = [...data.offerings]
    newOfferings[index] = value
    setData({ ...data, offerings: newOfferings })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
          <CardTitle>Hero Section</CardTitle>
          <CardDescription>The main banner text at the top of the About page.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="heroText">Hero Text</Label>
            <Textarea
              id="heroText"
              value={data.heroText}
              onChange={(e) => setData({ ...data, heroText: e.target.value })}
              placeholder="Your trusted partner for quality packaging solutions..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Our Story Section</CardTitle>
          <CardDescription>Tell your company's story.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="storyTitle">Section Title</Label>
            <Input
              id="storyTitle"
              value={data.storyTitle}
              onChange={(e) => setData({ ...data, storyTitle: e.target.value })}
              placeholder="Our Story"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="storyContent">Content</Label>
            <Textarea
              id="storyContent"
              value={data.storyContent}
              onChange={(e) => setData({ ...data, storyContent: e.target.value })}
              placeholder="DreamPack has been a leading supplier..."
              rows={6}
            />
            <p className="text-xs text-muted-foreground">
              Use blank lines to separate paragraphs.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Values Section</CardTitle>
          <CardDescription>Highlight your company values with icon cards.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.values.map((value, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm text-muted-foreground">Value #{index + 1}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeValue(index)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    value={value.title}
                    onChange={(e) => updateValue(index, 'title', e.target.value)}
                    placeholder="Quality Products"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Icon</Label>
                  <select
                    value={value.icon}
                    onChange={(e) => updateValue(index, 'icon', e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="shield">Shield (Quality)</option>
                    <option value="dollar">Dollar (Pricing)</option>
                    <option value="users">Users (Service)</option>
                    <option value="truck">Truck (Delivery)</option>
                    <option value="star">Star</option>
                    <option value="heart">Heart</option>
                    <option value="check">Check</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={value.description}
                  onChange={(e) => updateValue(index, 'description', e.target.value)}
                  placeholder="We source and provide only the highest quality..."
                  rows={2}
                />
              </div>
            </div>
          ))}
          <Button type="button" variant="outline" onClick={addValue} className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add Value
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Product Offerings</CardTitle>
          <CardDescription>List of products/services you offer.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.offerings.map((offering, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                value={offering}
                onChange={(e) => updateOffering(index, e.target.value)}
                placeholder="Paper Bags & Shopping Bags"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeOffering(index)}
                className="text-destructive hover:text-destructive flex-shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" onClick={addOffering} className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add Offering
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Call to Action</CardTitle>
          <CardDescription>The CTA section at the bottom of the page.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ctaTitle">CTA Title</Label>
            <Input
              id="ctaTitle"
              value={data.ctaTitle}
              onChange={(e) => setData({ ...data, ctaTitle: e.target.value })}
              placeholder="Ready to Get Started?"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ctaText">CTA Text</Label>
            <Input
              id="ctaText"
              value={data.ctaText}
              onChange={(e) => setData({ ...data, ctaText: e.target.value })}
              placeholder="Contact us today for a quote on your packaging needs."
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" disabled={saving} size="lg">
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </form>
  )
}
