import Link from 'next/link'
import { FileText, ChevronRight } from 'lucide-react'

const pages = [
  {
    name: 'About Page',
    description: 'Edit hero text, story, values, and CTA sections',
    href: '/admin/pages/about',
  },
]

export default function PagesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Pages</h1>
        <p className="text-neutral-600">
          Manage the content of your website pages.
        </p>
      </div>

      <div className="grid gap-4">
        {pages.map((page) => (
          <Link
            key={page.href}
            href={page.href}
            className="flex items-center justify-between p-4 bg-card border rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-neutral-900">{page.name}</h3>
                <p className="text-sm text-neutral-600">{page.description}</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-neutral-400" />
          </Link>
        ))}
      </div>
    </div>
  )
}
