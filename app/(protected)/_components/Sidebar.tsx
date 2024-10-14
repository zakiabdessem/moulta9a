import { useState } from 'react'

import { asset, DEFAULT_URL } from '@/routes'
import Image from 'next/image'

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  const Menus = [
    {
      title: 'Dashboard',
      href: DEFAULT_URL,
      src: asset('sidebar/dashboard.svg'),
      disabled: true,
    },
    {
      title: 'Events',
      href: DEFAULT_URL + '/admin/events',
      src: asset('sidebar/products.svg'),
    },
    {
      title: 'Blogs',
      href: DEFAULT_URL + '/admin/blogs',
      src: asset('sidebar/products.svg'),
      disabled: false,
    },
    {
      title: 'Users',
      href: DEFAULT_URL + '/admin/users',
      src: asset('sidebar/orders.svg'),
      inbox: true,
    },
  ]

  const toggleSidebar = () => setIsOpen(isOpen)

  return (
    <>
      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform sm:translate-x-0 ${
          isOpen ? '' : 'pt-0 -translate-x-full'
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-800 ">
          <ul className="space-y-2 font-medium">
            {Menus.map((menu, index) => (
              <li
                key={index}
                className={menu.disabled ? 'opacity-50 cursor-not-allowed' : ''}
              >
                <a
                  href={menu.href}
                  onClick={(e) => {
                    if (menu.disabled) {
                      e.preventDefault()
                    }
                  }}
                  className={`flex items-center p-2 text-gray-100 rounded-lg hover:bg-gray-700 ${
                    menu.disabled ? 'pointer-events-none' : ''
                  }`}
                  aria-disabled={menu.disabled}
                >
                  {/* <img
                    className="w-5 h-5 filter text-gray-500 transition duration-75 group-hover:text-gray-100"
                    src={menu.src}
                    alt={menu.title}
                  /> */}
                  {menu.title}
                  {/* {menu.inbox && (
                    <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">
                      3
                    </span>
                  )} */}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  )
}

function Navbar({ toggleSidebar }: { toggleSidebar: () => void }) {
  return (
    <nav className="fixed z-30 w-full bg-gray-50 border-b border-gray-200 shadow-sm">
      <div className="px-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <ToggleNavButton toggleSidebar={toggleSidebar} />
            <a href={DEFAULT_URL} className="flex h-20 ">
              <Image
                src={asset('logo_opera.png')}
                className="m-5 mt-4 h-12"
                alt="FlowBite Logo"
              />
            </a>
          </div>
          <div className="flex items-center">
            <div className="hidden mr-3 -mb-1 sm:block">
              <span />
            </div>

            {/* Notifications */}
            <button
              type="button"
              data-dropdown-toggle="notification-dropdown"
              className="p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100"
            >
              <span className="sr-only">View notifications</span>
              {/* Bell icon */}
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

function ToggleNavButton({ toggleSidebar }: { toggleSidebar: () => void }) {
  return (
    <button
      data-drawer-target="default-sidebar"
      data-drawer-toggle="default-sidebar"
      aria-controls="default-sidebar"
      type="button"
      className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
      onClick={toggleSidebar}
    >
      <span className="sr-only">Open sidebar</span>
      {/* SVG icon here */}
      <svg
        className="w-6 h-6"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          clipRule="evenodd"
          fillRule="evenodd"
          d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
        ></path>
      </svg>
    </button>
  )
}
