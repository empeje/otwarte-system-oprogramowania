'use client';
import {classNames} from "@/utils/helper";

export default function CardRounded({className, children}: { className?: string; children?: React.ReactNode }) {
  return (
    <div className={
      classNames(
        "rounded-[25px] bg-white p-[18px] sm:p-[25px]",
        className
      )
    }>
      {children}
    </div>
  )
}