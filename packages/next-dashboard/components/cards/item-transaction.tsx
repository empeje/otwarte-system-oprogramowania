import Image from "next/image";
import {classNames} from "@/utils/helper";

export default function ItemTransaction() {
  return (
    <div className={"flex w-full items-center gap-[15px] sm:gap-[17px]"}>
      <Image src={"/transaction/paypal.png"} alt={"Paypal"} width={55} height={55}
             className={"size-[50px] sm:size-[55px] rounded-full object-cover"}/>
      <div className={"space-y-[4px] sm:space-y-[7px]"}>
        <div className={
          classNames(
            "text-[14px] leading-[16px] font-[500]",
            "sm:text-[16px] sm:leading-[20px]",
            "text-[#232323]"
          )
        }>
          Deposit from my Card
        </div>
        <div className={
          classNames(
            "text-[12px] leading-[15px] font-normal",
            "sm:text-[15px] sm:leading-[18px]",
            "text-[#718EBF]"
          )
        }>
          28 January 2021
        </div>
      </div>
      <div className={"text-[11px] leading-[13px] text-[#FF4B4A] ml-auto"}> {/*#41D4A8*/}
        -$850
      </div>
    </div>
  )
}