'use client';

import {ChevronDownIcon} from '@heroicons/react/16/solid'
import {classNames} from "@/utils/helper";
import {usePathname} from "next/navigation";
import Link from "next/link";
import Container from "@/components/page/container";
import CardRounded from "@/components/cards/card-rounded";

export function SettingTab({children}: { children: React.ReactNode }) {
  const pathname = usePathname();

  const current = (path: string) => {
    return path === pathname
  }

  const tabs = [
    {name: 'Edit Profile', href: '/setting/profile', current: current('/setting/profile') || current('/setting')},
    {name: 'Preferences', href: '/setting/preference', current: current('/setting/preference')},
    {name: 'Security', href: '/setting/security', current: current('/setting/security')},
  ]

  return (
    <Container className="min-h-screen bg-[#F5F7FA]">
      <CardRounded className={"px-[20px] py-[25px] sm:pt-[30px] sm:pb-[37px] sm:px-[40px]"}>
        <div>
          <div className="hidden grid-cols-1 sm:hidden">
            {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
            <select
              defaultValue={tabs.find((tab) => tab.current)?.name}
              aria-label="Select a tab"
              className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
            >
              {tabs.map((tab) => (
                <option key={tab.name}>{tab.name}</option>
              ))}
            </select>
            <ChevronDownIcon
              aria-hidden="true"
              className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-gray-500"
            />
          </div>
          <div className="block">
            <div className="border-b border-[#F4F5F7]">
              <nav aria-label="Tabs" className="-mb-px flex justify-between sm:justify-start sm:gap-[43px]">
                {tabs.map((tab) => (
                  <Link
                    key={tab.name}
                    href={tab.href}
                    aria-current={tab.current ? 'page' : undefined}
                    className={classNames(
                      "font-semibold text-[16px] leading-[20px]",
                      tab.current
                        ? 'text-[#232323]'
                        : 'border-transparent text-[#718EBF] hover:border-gray-300 hover:text-[#232323]',
                      'w-fit px-[6px] sm:px-[16px] pb-4 text-center text-[13px] sm:text-sm font-medium relative',
                      "whitespace-nowrap"
                    )}
                  >
                    {tab.name}
                    <div className={
                      classNames(
                        "absolute inset-x-0 bottom-0 bg-[#232323] h-[3px] rounded-t-[10px]",
                        tab.current ? "block" : "hidden"
                      )
                    }/>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
        <div>
          {children}
        </div>
      </CardRounded>
    </Container>
  )
}