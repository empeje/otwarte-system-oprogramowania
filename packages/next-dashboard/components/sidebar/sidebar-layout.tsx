'use client'

import React, {useCallback, useState} from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  TransitionChild,
} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import {classNames} from "@/utils/helper";
import {Icons} from "@/components/icons/icons";
import Image from "next/image";
import {usePathname} from "next/navigation";

const navigation = [
  {name: 'Dashboard', href: '/Dashboard', icon: Icons.Home, current: true},
  {name: 'Transactions', href: '/Transactions', icon: Icons.Transfer, current: false},
  {name: 'Accounts', href: '/Accounts', icon: Icons.User, current: false},
  {name: 'Investments', href: '/Investments', icon: Icons.EconomicInvestment, current: false},
  {name: 'Credit Cards', href: '/Credit', icon: Icons.CreditCard, current: false},
  {name: 'Loans', href: '/Loans', icon: Icons.Loan, current: false},
  {name: 'Services', href: '/Services', icon: Icons.Service, current: false},
  {name: 'My Privileges', href: '/My', icon: Icons.Econometrics, current: false},
  {name: 'Setting', href: '/setting', icon: Icons.Settings, current: false},
]

type Props = {
  children: React.ReactNode
}

export default function SidebarLayout({children}: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname();

  return (
    <div>
      <MobileMenu
        pathname={pathname}
        navigation={navigation}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}/>

      {/* Static sidebar for desktop */}
      <DesktopMenu
        pathname={pathname}
        navigation={navigation}/>

      <div className="lg:pl-[249px]">
        <Navbar setSidebarOpen={setSidebarOpen} title={"Overview"}/>

        <main>
          {children}
        </main>
      </div>
    </div>
  )
}

type NavigationProps = {
  navigation: {
    name: string;
    href: string;
    icon: typeof Icons.Home;
  }[];
  pathname: string;
}

const Navigation = ({navigation, pathname}: NavigationProps) => {
  const current = (path: string) => {
    return path === pathname
  }

  return <ul role="list" className="mx-[12px] space-y-0">
    {navigation.map((item) => (
      <li key={item.name} className={"h-[60px] flex items-center relative"}>
        <div className={
          classNames(
            current(item.href) ? "block" : "hidden",
            "w-[6px] h-full absolute -left-[36px] bg-[#232323] rounded-r-[10px]"
          )
        }/>
        <a
          href={item.href}
          className={classNames(
            current(item.href)
              ? 'bg-transparent text-[#232323]'
              : 'text-[#B1B1B1] hover:bg-transparent hover:text-[#232323]',
            'group flex items-center gap-x-[26px] rounded-md p-2 text-[18px] font-[500]',
            "whitespace-nowrap"
          )}
        >
          <item.icon
            aria-hidden="true"
            className={classNames(
              current(item.href) ? 'text-[#232323]' : 'text-[#B1B1B1] group-hover:text-[#232323]',
              'size-[25px] shrink-0',
            )}
          />
          {item.name}
        </a>
      </li>
    ))}
  </ul>
}

const Logo = () => {
  return (
    <Image
      alt="Soar Task"
      src="/logo.png"
      className="h-[35px] w-auto"
      width={167}
      height={35}
    />
  )
}

type MobileMenuProps = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
} & NavigationProps

const MobileMenu = ({navigation, pathname, sidebarOpen, setSidebarOpen}: MobileMenuProps) => {
  return (
    <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 flex">
        <DialogPanel
          transition
          className="relative mr-16 flex w-full max-w-[249px] flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
        >
          <TransitionChild>
            <div
              className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
              <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                <span className="sr-only">Close sidebar</span>
                <XMarkIcon aria-hidden="true" className="size-6 text-[#232323]"/>
              </button>
            </div>
          </TransitionChild>
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-[13px] overflow-y-auto bg-white px-6 pb-4">
            <div className="flex h-[100px] shrink-0 items-center pl-[12px]">
              <Logo/>
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <Navigation navigation={navigation} pathname={pathname}/>
                </li>
              </ul>
            </nav>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}

const DesktopMenu = ({navigation, pathname}: NavigationProps) => {
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-[249px] lg:flex-col border-r border-[#E6EFF5]">
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className="flex grow flex-col gap-y-[13px] overflow-y-auto bg-white px-6 pb-4">
        <div className="flex h-[100px] shrink-0 items-center pl-[12px]">
          <Logo/>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <Navigation navigation={navigation} pathname={pathname}/>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

const Navbar = ({setSidebarOpen, title}: { setSidebarOpen: (open: boolean) => void; title: string }) => {

  const SearchInput = useCallback(() => {
    return <div
      className="grid flex-1 grid-cols-1 bg-[#F5F7FA] h-[40px] sm:h-[50px] px-[20px] sm:px-[25px] rounded-[40px]">
      <input
        name="search"
        type="search"
        placeholder="Search for something"
        aria-label="Search"
        className="bg-transparent col-start-1 row-start-1 block size-full pl-8 text-[15px] text-gray-900 outline-none placeholder:text-[#8BA3CB] sm:text-[15px]"
      />
      <Icons.MagnifyingGlass
        width={20}
        height={20}
        aria-hidden="true"
        className="pointer-events-none col-start-1 row-start-1 size-5 self-center text-[#718EBF]"
      />
    </div>
  }, [])

  return (
    <div
      className={
        classNames(
          "sticky top-0 z-40 flex flex-wrap min-h-[100px] max-h-[140px] shrink-0 sm:items-center gap-x-4 bg-white px-4 sm:gap-x-6 sm:px-6 lg:px-10",
          "py-[20px] sm:py-0 gap-y-[20px]"
        )
      }>
      <button type="button" onClick={() => setSidebarOpen(true)} className="-m-2.5 p-2.5 text-gray-700 lg:hidden">
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon aria-hidden="true" className="size-6"/>
      </button>
      <div className={"flex flex-1 w-full"}>
        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
          <div className="grid flex-1 grid-cols-1">
            <div
              className="size-full flex items-center justify-center md:justify-start font-semibold text-[20px] sm:text-[28px] text-[#343C6A]">
              {title}
            </div>
          </div>
          <div className="flex items-center gap-x-4 lg:gap-x-[30px]">
            <div className={"hidden sm:block"}>
              <SearchInput/>
            </div>
            <button
              type="button"
              className="hidden md:flex items-center justify-center text-gray-400 hover:text-gray-500 bg-[#F5F7FA] rounded-full size-[50px]">
              <span className="sr-only">View settings</span>
              <Icons.SettingOutline
                width={25}
                height={25}
                aria-hidden="true" className="size-6 text-[#718EBF]"/>
            </button>
            <button
              type="button"
              className="hidden md:flex items-center justify-center text-gray-400 hover:text-gray-500 bg-[#F5F7FA] rounded-full size-[50px]">
              <span className="sr-only">View notifications</span>
              <Icons.NotificationOutline
                width={25}
                height={25}
                aria-hidden="true" className="size-6 text-[#396AFF]"/>
            </button>

            {/* Profile dropdown */}
            <Menu as="div" className="relative pl-[5px]">
              <MenuButton className="-m-1.5 flex items-center p-1.5">
                <span className="sr-only">Open user menu</span>
                <Image
                  alt="Image admin"
                  width={60}
                  height={60}
                  src="/admin.png"
                  className="size-[35px] sm:size-[60px] rounded-full"
                />
              </MenuButton>
            </Menu>
          </div>
        </div>
      </div>
      <div className={"flex sm:hidden basis-full mt-auto"}>
        <SearchInput/>
      </div>
    </div>
  )
}