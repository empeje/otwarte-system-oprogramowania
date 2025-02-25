import {classNames} from "@/utils/helper";
import Image from "next/image";

export default function CreditCard({dark}: { dark?: boolean }) {
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
  return (
    <div className={classNames("group flex-1 flex-shrink-0", dark && "dark")}>
      <div className={
        classNames(
          "font-[Lato]",
          "rounded-[25px] bg-white max-w-[265px] sm:max-w-[400px]", //  sm:max-w-[350px]
          "h-[170px] sm:h-[235px]",
          "dark:bg-[linear-gradient(107.38deg,#5B5A6F_2.61%,#000000_101.2%)]",
          "border border-[#DFEAF2] dark:border-0",
          "text-[#343C6A] dark:text-white"
        )
      }>
        <div className={"px-5 sm:px-[24px] pt-[18px] pb-4 sm:pb-[35px] h-[119px] sm:h-[165px] flex flex-col"}>
          <div className="flex items-start justify-between w-full">
            <Detail title={"Balance"} content={"$5,756"}/>
            <div>
              <Image
                src={dark ? "/chip-card-light.png" : "/chip-card-dark.png"} alt={"Chip Card"} width={35}
                height={35}/>
            </div>
          </div>
          <div className="mt-auto flex items-start space-x-[57px] sm:space-x-[67px] w-full">
            <SecondaryDetail title={"CARD HOLDER"} content={"Eddy Cusuma"}/>
            <SecondaryDetail title={"VALID THRU"} content={"12/22"}/>
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
            3778 **** **** 1234
          </div>
          <Image src={dark ? "/master-card-light.png" : "/master-card-dark.png"} alt={"Mater card"} width={44}
                 height={30}
                 className={"h-[27px] sm:h-[30px] w-auto"}/>
        </div>
      </div>
    </div>
  )
}