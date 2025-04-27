'use client';

import React from "react";
import {classNames, ClassNameType} from "@/utils/helper";

export default function Container({children, className}: {
  children: React.ReactNode;
  className?: ClassNameType
}) {
  return (
    <div className={
      classNames(
        "px-[25px] py-[25px] lg:py-[30px] sm:px-6 lg:px-10",
        "sm:border-t border-[#E6EFF5]",
        className
      )
    }>{children}</div>
  )
}