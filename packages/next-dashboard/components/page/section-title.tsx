'use client'

import {classNames, ClassNameType} from "@/utils/helper";

export default function SectionTitle({title, className}: { title: string; className?:ClassNameType }) {
  return (
    <h1 className={
      classNames(
        "text-[16px] leading-[20px] font-semibold mb-[22px] sm:mb-[20px] text-[#343C6A]",
        className
      )
    }>
      {title}
    </h1>
  )
}