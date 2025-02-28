'use client';

import {classNames} from "@/utils/helper";
import {Contact} from "@/types/contact";
import Image from "next/image";

export default function ItemProfile({contact}: { contact: Contact }) {
  return (
    <div className={"flex flex-col items-center justify-center"}>
      <Image src={contact.avatar} alt={"People"} width={70} height={70} className={"size-[50px] sm:size-[70px] rounded-full"}/>
      <div className={
        classNames("mt-[12px] sm:mt-[15px]",
          "text-[12px] leading-[15px] font-normal",
          "sm:text-[16px] leading-[20px]",
          "text-[#232323]",
          "whitespace-nowrap max-w-[85px] overflow-hidden text-ellipsis"
        )
      }>
        {contact.name}
      </div>
      <div
        title={contact.bankName}
        className={
        classNames(
          "mt-[1px]",
          "text-[12px] leading-[15px] font-normal",
          "sm:text-[15px] sm:leading-[18px]",
          "text-[#718EBF]",
          "whitespace-nowrap max-w-[85px] overflow-hidden text-ellipsis"
        )
      }>
        {contact.bankName}
      </div>
    </div>
  )
}