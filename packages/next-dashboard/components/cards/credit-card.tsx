'use client';

import {classNames} from "@/utils/helper";
import Image from "next/image";
import {Card, CardColor} from "@/types/card";

export default function CreditCard({card}: { card: Card }) {
  const Detail = ({title, content}: { title: string; content: string }) => {
    return (
      <div>
        <div className={
          classNames(
            "text-[11px] leading-[13px] font-normal",
            "sm:text-[12px] sm:leading-[14px]",
            "text-[#718EBF] dark:text-white/[.7]"
          )
        }>{title}</div>

        <div className={
          classNames(
            "text-[16px] leading-[20px] font-semibold",
            "sm:text-[20px] sm:leading-[24px]",
            "text-[#343C6A] dark:text-white"
          )
        }>{content}</div>
      </div>
    )
  }
  const SecondaryDetail = ({title, content}: { title: string; content: string }) => {
    return (
      <div className={"space-y-[3px]"}>
        <div className={
          classNames(
            "text-[10px] leading-[12px] font-normal",
            "sm:text-[12px] sm:leading-[14px]",
            "text-[#718EBF] dark:text-white/[.7]",
            "whitespace-nowrap"
          )
        }>{title}</div>

        <div className={classNames(
          "text-[13px] leading-[15px] font-semibold",
          "sm:text-[15px] sm:leading-[18px]",
          "text-[#343C6A] dark:text-white",
          "whitespace-nowrap"
        )}>{content}</div>
      </div>
    )
  }
  const cardColor: CardColor = card.color;

  const isMasterCard = card.type === 'mastercard';
  const idDark = ['black', 'gold', 'rose-gold'].includes(cardColor);

  return (
    <div className={classNames("group flex-1 flex-shrink-0", idDark && "dark")}>
      <div className={
        classNames(
          "font-[Lato]",
          cardColor === 'white' && "bg-white",
          cardColor === 'black' && "bg-[linear-gradient(107.38deg,#5B5A6F_2.61%,#000000_101.2%)]",
          cardColor === 'rose-gold' && "bg-orange-300",
          cardColor === 'gold' && "bg-yellow-500",
          cardColor === 'platinum' && "bg-neutral-300",
          "rounded-[25px] w-[265px] sm:w-[350px]", //  sm:max-w-[350px]
          "h-[170px] sm:h-[235px]",
          "border border-[#DFEAF2] dark:border-0",
          "text-[#343C6A] dark:text-white"
        )
      }>
        <div className={"px-5 sm:px-[24px] pt-[18px] pb-4 sm:pb-[35px] h-[119px] sm:h-[165px] flex flex-col"}>
          <div className="flex items-start justify-between w-full">
            <Detail title={"Balance"} content={card.formattedBalance}/>
            <div>
              <Image
                src={idDark ? "/chip-card-light.png" : "/chip-card-dark.png"} alt={"Chip Card"} width={35}
                height={35}/>
            </div>
          </div>
          <div className="mt-auto flex items-start space-x-[57px] sm:space-x-[67px] w-full">
            <SecondaryDetail title={"CARD HOLDER"} content={card.cardholderName}/>
            <SecondaryDetail title={"VALID THRU"} content={card.expiryDate}/>
          </div>
        </div>
        <div
          className={
            classNames(
              "px-5 sm:px-[24px]",
              "bg-[linear-gradient(180deg,rgba(255,255,255,0.15)_0%,rgba(255,255,255,0)_100%)] h-[50] sm:h-[70px]",
              "flex items-center justify-between",
              "border-t border-[#DFEAF2] dark:border-0",
            )
          }>
          <div className={
            classNames(
              "text-[15px] leading-[18px]",
              "sm:text-[22px] sm:leading-[26px]"
            )

          }>
            {card.maskedNumber}
          </div>
          {isMasterCard &&
              <Image src={idDark ? "/master-card-light.png" : "/master-card-dark.png"} alt={"Mater card"} width={44}
                     height={30}
                     className={"h-[27px] sm:h-[30px] w-auto"}/>}
        </div>
      </div>
    </div>
  )
}