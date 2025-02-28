'use client';

import {classNames, ClassNameType} from "@/utils/helper";
import Image from "next/image";
import {Card, CardColor} from "@/types/card";

export default function CreditCard({card, className}: { card: Card;className?:ClassNameType }) {
  const Detail = ({title, content}: { title: string; content: string }) => {
    return (
      <div>
        <div className={
          classNames(
            "text-[11px] leading-[13px] font-normal",
            "xl:text-[12px] xl:leading-[14px]",
            "text-[#718EBF] dark:text-white/[.7]"
          )
        }>{title}</div>

        <div className={
          classNames(
            "text-[16px] leading-[20px] font-semibold",
            "xl:text-[20px] xl:leading-[24px]",
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
            "xl:text-[12px] xl:leading-[14px]",
            "text-[#718EBF] dark:text-white/[.7]",
            "whitespace-nowrap"
          )
        }>{title}</div>

        <div className={classNames(
          "text-[13px] leading-[15px] font-semibold",
          "xl:text-[15px] xl:leading-[18px]",
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
          "rounded-[25px]", //  xl:max-w-[350px]
          // "w-[265px] h-[170px]",
          "aspect-[256/170]",
          "xl:w-[350px] xl:h-[235px]",
          "border border-[#DFEAF2] dark:border-0",
          "text-[#343C6A] dark:text-white",
          className
        )
      }>
        <div className={"px-5 xl:px-[24px] pt-[18px] pb-4 xl:pb-[35px] aspect-[256/119] xl:h-[165px] flex flex-col"}>
          <div className="flex items-start justify-between w-full">
            <Detail title={"Balance"} content={card.formattedBalance}/>
            <div>
              <Image
                src={idDark ? "/chip-card-light.png" : "/chip-card-dark.png"} alt={"Chip Card"} width={35}
                height={35}/>
            </div>
          </div>
          <div className="mt-auto flex items-start space-x-[57px] xl:space-x-[67px] w-full">
            <SecondaryDetail title={"CARD HOLDER"} content={card.cardholderName}/>
            <SecondaryDetail title={"VALID THRU"} content={card.expiryDate}/>
          </div>
        </div>
        <div
          className={
            classNames(
              "px-5 xl:px-[24px]",
              "bg-[linear-gradient(180deg,rgba(255,255,255,0.15)_0%,rgba(255,255,255,0)_100%)]",
              // "xl:h-[70px]",
              "aspect-[256/50] mt-auto", // perlu di benerin
              "flex items-center justify-between",
              "border-t border-[#DFEAF2] dark:border-0",
            )
          }>
          <div
            className={
            classNames(
              "text-[15px] leading-[18px]",
              "xl:text-[22px] xl:leading-[26px]"
            )

          }>
            {card.maskedNumber}
          </div>
          {isMasterCard &&
              <Image src={idDark ? "/master-card-light.png" : "/master-card-dark.png"} alt={"Mater card"} width={44}
                     height={30}
                     className={"h-[27px] xl:h-[30px] w-auto"}/>}
        </div>
      </div>
    </div>
  )
}