'use client'

import { UserButton } from '@/components/auth/user-button'
import { Button } from '@/components/ui/button'
import { useCurrentUser } from '@/hooks/use-current-user'
import { GlobeIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { useState } from 'react'
import { FaBars, FaSearch } from 'react-icons/fa'

export const Navbar = () => {
  const user = useCurrentUser()
  const [showMenu, setShowMenu] = useState(false)

  const handleMenu = () => {
    setShowMenu(!showMenu)
  }

  return (
    <nav className="container flex justify-between items-center w-full py-4">
      <a href="/">LOGO</a>
      <ul className="flex justify-between items-center p-4 rounded-xl w-3/6 max-xl:hidden">
        <li>
          <Link className="text-md font-bold" href="/events">
            Events
          </Link>
        </li>
        <li>
          <Link className="text-md font-bold" href="#blogs">
            Blogs
          </Link>
        </li>
        <li>
          <Link className="text-sm font-bold" href="/about">
            About
          </Link>
        </li>
        <li>
          <Link className="text-md font-bold" href="/contact">
            Contact us
          </Link>
        </li>
        <li>
          {user ? (
            <UserButton />
          ) : (
            <Link className="text-md font-bold" href="/auth/login">
              <Button
                variant="default"
                className="text-[#262626] font-bold rounded-full"
              >
                Sign in
              </Button>
            </Link>
          )}
        </li>

        <Button variant="default" className="rounded-full">
          <GlobeIcon color="white" />
        </Button>
      </ul>

      <div
        className={`${
          showMenu ? 'block' : 'hidden'
        } fixed inset-0 bg-white z-50 xl:hidden`}
      >
        <div>
          <div className="flex justify-between items-center p-4">
            <a href="/">LOGO</a>
            <Button
              onClick={() => handleMenu()}
              variant="default"
              className="rounded-full size-12"
            >
              <FaBars color="white" />
            </Button>
          </div>
        </div>
        <ul className="flex flex-col items-center justify-center h-full space-y-6">
          <li>
            <Link className="text-md font-bold" href="#events">
              Events
            </Link>
          </li>
          <li>
            <Link className="text-md font-bold" href="#blogs">
              Blogs
            </Link>
          </li>
          <li>
            <Link className="text-md font-bold" href="/about">
              About
            </Link>
          </li>
          <li>
            <Link className="text-md font-bold" href="/contact">
              Contact us
            </Link>
          </li>
          <li>
            {user ? (
              <UserButton />
            ) : (
              <Link href="/auth/login">
                <Button
                  variant="default"
                  className="text-[#262626] font-bold rounded-full"
                >
                  Sign in
                </Button>
              </Link>
            )}
          </li>
        </ul>
      </div>

      <Button
        onClick={() => handleMenu()}
        variant="default"
        className="rounded-full xl:hidden size-12"
      >
        <FaBars color="white" />
      </Button>
    </nav>
  )
}
