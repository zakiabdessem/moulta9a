import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { useLanguage } from '../../../zustand'
import { GlobeIcon } from 'lucide-react'

const DropdownLanguageSwitcher = () => {
  //  const { switchLanguage } = useLanguage()

  const handleLanguageChange = (lang: string) => {
    // switchLanguage(lang)
  }

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        className="rounded-full"
      >
        <GlobeIcon color="white" />
      </MenuButton>
      <MenuList>
        {/* <MenuItem onClick={() => handleLanguageChange('en')}>English</MenuItem>
        <MenuItem onClick={() => handleLanguageChange('ar')}>العربية</MenuItem> */}
      </MenuList>
    </Menu>
  )
}

export default DropdownLanguageSwitcher
