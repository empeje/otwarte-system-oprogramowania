'use client';

import React from "react";
import {classNames, ClassNameType} from "@/utils/helper";

export default function Section({children, className}: {
  children: React.ReactNode;
  className: ClassNameType
}) {
  return (
    <div className={
      classNames(
        "px-4 sm:px-6 lg:px-10",
        className
      )
    }>{children}</div>
  )
}