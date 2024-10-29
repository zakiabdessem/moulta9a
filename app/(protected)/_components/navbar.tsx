'use client'

import { UserButton } from '@/components/auth/user-button'
import { Button } from '@/components/ui/button'
import { useCurrentUser } from '@/hooks/use-current-user'
import { useLanguage } from '@/zustand'
import Link from 'next/link'
import { useState } from 'react'
import { FaBars } from 'react-icons/fa'
import DropdownLanguageSwitcher from './switchLang'
import Language from '@/public/language.json'
import Image from 'next/image'
import Logo from '@/public/moulta9a.png'

export const Navbar = () => {
  const user = useCurrentUser()
  const [showMenu, setShowMenu] = useState(false)
  const { language } = useLanguage() as { language: 'en' | 'ar' }

  const handleMenu = () => {
    setShowMenu(!showMenu)
  }

  return (
    <nav
      dir={language == 'ar' ? 'rtl' : 'ltr'}
      className="container flex justify-between items-center w-full py-4"
    >
      <a href="/">
        <Image src={Logo} alt="Logo" width={120} height={70} />
      </a>
      <ul className="flex justify-between items-center p-4 rounded-xl w-3/6 max-xl:hidden">
        <li>
          <Link className="text-md font-bold" href="/events">
            {Language.navbar.links.events[language]}
          </Link>
        </li>
        <li>
          <Link className="text-md font-bold" href="/#blogs">
            {Language.navbar.links.blogs[language]}
          </Link>
        </li>
        <li>
          <Link className="text-sm font-bold" href="/about">
            {Language.navbar.links.about[language]}
          </Link>
        </li>
        <li>
          <Link className="text-md font-bold" href="/contact">
            {Language.navbar.links.contact[language]}
          </Link>
        </li>
        <li>
          {user ? (
            <UserButton />
          ) : (
            <Link className="text-md font-bold" href="/auth/login">
              <Button
                variant="default"
                className="text-white font-bold rounded-full"
              >
                {Language.navbar.links.signIn[language]}
              </Button>
            </Link>
          )}
        </li>
        <DropdownLanguageSwitcher />
      </ul>

      <div
        className={`${
          showMenu ? 'block' : 'hidden'
        } fixed inset-0 bg-white z-50 xl:hidden`}
      >
        <div>
          <div className="flex justify-between items-center p-4">
            <a href="/">
              <Image src={Logo} alt="Logo" width={120} height={70} />
            </a>
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
              {Language.navbar.links.events[language]}
            </Link>
          </li>
          <li>
            <Link className="text-md font-bold" href="/#blogs">
              {Language.navbar.links.blogs[language]}
            </Link>
          </li>
          <li>
            <Link className="text-md font-bold" href="/about">
              {Language.navbar.links.about[language]}
            </Link>
          </li>
          <li>
            <Link className="text-md font-bold" href="/contact">
              {Language.navbar.links.contact[language]}
            </Link>
          </li>
          <li>
            {user ? (
              <UserButton />
            ) : (
              <Link href="/auth/login">
                <Button
                  variant="default"
                  className="text-white font-bold rounded-full"
                >
                  {Language.navbar.links.signIn[language]}
                </Button>
              </Link>
            )}
          </li>
          <DropdownLanguageSwitcher />
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
