import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import { useLanguage } from '@/zustand'
import Language from '@/public/language.json'

export default function Footer() {
  const { language } = useLanguage() as { language: 'en' | 'ar' }

  return (
    <footer className="bg-gray-100 text-gray-600 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">
              {Language.footer.logoText[language]}
            </h3>
            <p className="text-sm">
              {Language.heroSection.description[language]}
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/events" className="hover:text-gray-900">
                  {Language.footer.quickLinks.events[language]}
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="hover:text-gray-900">
                  {Language.footer.quickLinks.blogs[language]}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gray-900">
                  {Language.footer.quickLinks.about[language]}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gray-900">
                  {Language.footer.quickLinks.contact[language]}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">
              {Language.footer.legal.title[language]}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="hover:text-gray-900">
                  {Language.footer.legal.termsOfService[language]}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-gray-900">
                  {Language.footer.legal.privacyPolicy[language]}
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-gray-900">
                  {Language.footer.legal.cookiePolicy[language]}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <Link
                href="https://www.facebook.com/profile.php?id=61567758991103"
                className="hover:text-gray-900"
              >
                <Facebook size={20} />
              </Link>
              <Link href="#" className="hover:text-gray-900">
                <Twitter size={20} />
              </Link>
              <Link
                href="https://www.instagram.com/al_multaqua?igsh=amRvaGYzcjlreDdq"
                className="hover:text-gray-900"
              >
                <Instagram size={20} />
              </Link>
              <Link href="#" className="hover:text-gray-900">
                <Linkedin size={20} />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()}{' '}
            {Language.footer.copyright[language]}
          </p>
        </div>
      </div>
    </footer>
  )
}
