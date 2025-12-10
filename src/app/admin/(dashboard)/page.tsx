import { db } from '@/db'
import { categories, products, media, pages } from '@/db/schema'
import { count } from 'drizzle-orm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Package, FolderTree, Image, FileText } from 'lucide-react'

export default async function AdminDashboard() {
  const [categoriesCount, productsCount, mediaCount, pagesCount] = await Promise.all([
    db.select({ count: count() }).from(categories),
    db.select({ count: count() }).from(products),
    db.select({ count: count() }).from(media),
    db.select({ count: count() }).from(pages),
  ])

  const stats = [
    {
      title: 'Categories',
      value: categoriesCount[0].count,
      icon: FolderTree,
      href: '/admin/categories',
    },
    {
      title: 'Products',
      value: productsCount[0].count,
      icon: Package,
      href: '/admin/products',
    },
    {
      title: 'Media',
      value: mediaCount[0].count,
      icon: Image,
      href: '/admin/media',
    },
    {
      title: 'Pages',
      value: pagesCount[0].count,
      icon: FileText,
      href: '/admin/pages',
    },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
