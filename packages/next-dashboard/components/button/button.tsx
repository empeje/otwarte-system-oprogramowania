import {JSX} from "react";
import {classNames, ClassNameType} from "@/utils/helper";

export default function Button({type = "button", className}: {
  className: ClassNameType;
  type?: "button" | "submit" | "reset"
}): JSX.Element {
  return (
    <button
      type={type}
      className={
        classNames(
          "min-h-[50px] min-w-[190px] rounded-[15px] bg-[#232323] flex items-center justify-center px-3.5 py-2.5 text-[18px] font-medium text-white hover:bg-[#232323]/20",
          className
        )
      }
    >
      Save
    </button>
  )
}
