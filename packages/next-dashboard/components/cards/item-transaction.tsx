'use client';

import {classNames, dateFormatter} from "@/utils/helper";
import {Transaction} from "@/types/transaction";
import React, {useEffect, useMemo, useState} from "react";
import Image from "next/image";

export default function ItemTransaction({transaction}: { transaction: Transaction }) {
  const [locale, setLocale] = useState("en");

  useEffect(() => {
    setLocale(navigator.language);
  }, []);

  const icon = useMemo(() => {
    switch (transaction.category) {
      case "investment":
        return "/transaction/wallet.png"
      case "bills":
      case "healthcare":
        return "/transaction/paypal.png"
      case "entertainment":
      case "food":
      case "shopping":
        return "/transaction/coin.png"
      default:
        return "/transaction/coin.png"

    }
  }, [transaction.category]);

  const amountColor = useMemo(() => {
    switch (transaction.type) {
      case "deposit":
        return 'text-[#41D4A8]' // green
      default:
        return 'text-[#FF4B4A]' // red
    }
  }, [transaction.type])

  return (
    <div className={"flex w-full items-center gap-[15px] sm:gap-[17px]"}>
      <Image src={icon} alt={"Paypal"} width={55} height={55}
             className={"size-[50px] sm:size-[55px] rounded-full object-cover"}/>
      <div className={"space-y-[4px] sm:space-y-[7px] overflow-hidden"}>
        <div className={
          classNames(
            "text-[14px] leading-[16px] font-[500]",
            "sm:text-[16px] sm:leading-[20px]",
            "text-[#232323]",
            "max-w-[90%] overflow-hidden whitespace-nowrap text-ellipsis"
          )
        }>
          {transaction.category} {transaction.description}
        </div>
        <div className={
          classNames(
            "text-[12px] leading-[15px] font-normal",
            "sm:text-[15px] sm:leading-[18px]",
            "text-[#718EBF]"
          )
        }>
          {dateFormatter(transaction.date, locale)}
        </div>
      </div>
      <div className={
        classNames(
          "text-[11px] leading-[13px] ml-auto",
          amountColor
        )
      }>
        {transaction.formattedAmount}
      </div>
    </div>
  )
}