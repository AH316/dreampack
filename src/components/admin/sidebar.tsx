'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  FolderTree,
  Package,
  Image,
  FileText,
  Settings,
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Categories', href: '/admin/categories', icon: FolderTree },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Media', href: '/admin/media', icon: Image },
  { name: 'Pages', href: '/admin/pages', icon: FileText },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed inset-y-0 left-0 z-50 hidden w-64 bg-card border-r lg:block">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/admin" className="text-xl font-bold">
          DreamPack
        </Link>
      </div>
      <nav className="flex flex-col gap-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href ||
            (item.href !== '/admin' && pathname.startsWith(item.href))
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
