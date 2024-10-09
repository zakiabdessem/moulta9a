'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { FaUser, FaUserAlt, FaUserFriends } from 'react-icons/fa'
import { useCurrentUser } from '@/hooks/use-current-user'
import { LogoutButton } from './logout-button'
import { Button } from '@react-email/components'
import { ExitIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { Calendar, Plus, Tickets } from 'lucide-react'
import { useEffect, useState } from 'react'
import { User } from '@prisma/client'

export const UserButton = () => {
  const [_user, setUser] = useState<
    User & {
      role: string
      image: string
      isOAuth: boolean
      isTwoFactorEnabled: boolean
    }
  >()
  const user = useCurrentUser()

  useEffect(() => {
    if (!user) {
      return
    }
    setUser(user as any)
  }, [user])

  if (!user) {
    return 'Unauthorized'
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus-visible:outline-none">
        <Avatar>
          <AvatarImage src={user.image ?? ''} />
          <AvatarFallback className="bg-gradient-to-b from-gray-700 via-gray-900 to-black text-white">
            <FaUser />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72" align="center">
        <DropdownMenuLabel>
          <div className="py-2 px-4 rounded-md bg-slate-100">
            <div>
              <h4 className="font-semibold text-lg tracking-tight">
                {user.name}
              </h4>
              <h4 className="mt-0 font-light text-xs">{user.email}</h4>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <Link href="/settings" className="flex justify-between">
            <FaUserFriends className="h-4 w-4 mr-2 " />
            Profile
          </Link>
        </DropdownMenuItem>
        {(user.role === 'MANAGER' || user.role === 'ADMIN') && (
          <DropdownMenuItem className="cursor-pointer">
            <Link
              href="/settings/event/create"
              className="flex justify-between"
            >
              <Plus className="h-4 w-4 mr-2 " />
              Launch an event
            </Link>
          </DropdownMenuItem>
        )}
        {(user.role === 'MANAGER' || user.role === 'ADMIN') && (
          <DropdownMenuItem className="cursor-pointer">
            <Link href="/settings/event" className="flex justify-between">
              <Tickets className="h-4 w-4 mr-2 " />
              Events
            </Link>
          </DropdownMenuItem>
        )}
        <LogoutButton>
          <DropdownMenuItem className="cursor-pointer">
            <ExitIcon className="h-4 w-4" />
            <Button className="ml-2">Sign Out</Button>
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
