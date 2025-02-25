import Image from "next/image";
import {classNames} from "@/utils/helper";

export default function ItemProfile() {
  return (
    <div className={"flex flex-col items-center justify-center"}>
      <Image src={"/people/woman.png"} alt={"People"} width={70} height={70} className={"size-[50px] sm:size-[70px]"}/>
      <div className={
        classNames("mt-[12px] sm:mt-[15px]",
          "text-[12px] leading-[15px] font-normal",
          "sm:text-[16px] leading-[20px]",
          "text-[#232323]",
          "whitespace-nowrap",
        )
      }>
        Livia Bator
      </div>
      <div className={
        classNames(
          "mt-[1px]",
          "text-[12px] leading-[15px] font-normal",
          "sm:text-[15px] sm:leading-[18px]",
          "text-[#718EBF]",
        "whitespace-nowrap",
        )
      }>
        CEO
      </div>
    </div>
  )
}