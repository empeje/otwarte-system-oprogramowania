'use client';

import React, { ReactNode } from "react";
import {classNames, ClassNameType} from "@/utils/helper";

export default function Section({children, className}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
  className: ClassNameType
}) {
  return (
    <div className={
      classNames(
        "px-[25px] sm:px-6 lg:px-10",
        className
      )
    }>{children as ReactNode}</div>
  )
}