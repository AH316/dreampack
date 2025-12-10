'use client'

import { signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { LogOut, User } from 'lucide-react'

interface AdminHeaderProps {
  user: {
    name?: string | null
    email: string
  }
}

export function AdminHeader({ user }: AdminHeaderProps) {
  const initials = user.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : user.email[0].toUpperCase()

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-card px-6">
      <div className="lg:hidden">
        <span className="text-xl font-bold">DreamPack</span>
      </div>
      <div className="flex-1" />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-9 w-9 rounded-full">
            <Avatar className="h-9 w-9">
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <div className="flex items-center gap-2 p-2">
            <div className="flex flex-col space-y-0.5">
              {user.name && (
                <p className="text-sm font-medium">{user.name}</p>
              )}
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/admin/login' })}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
