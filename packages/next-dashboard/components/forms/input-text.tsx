'use client';

import {ForwardedRef, forwardRef} from "react";
import {classNames, ClassNameType} from "@/utils/helper";

type InputType = {
  label: string;
  placeholder?: string,
  type?: "text" | "number" | "email" | 'password' | string,
  name?: string,
  required?: boolean,
  className?: ClassNameType,
}

// eslint-disable-next-line react/display-name
export const InputText = forwardRef<HTMLInputElement, InputType>((
  {
    label,
    placeholder,
    type = "text",
    name,
    required = true,
    className,
  }: InputType, ref: ForwardedRef<HTMLInputElement>) => {
  return (
    <div className={classNames(className)}>
      {label && <label htmlFor={name} className="block text-[16px] font-medium text-[#232323]">
        {label}
      </label>}
      <div className="mt-[11px]">
        <input
          id={name}
          ref={ref}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          className="text-[#718EBF] text-[15px] leading-[18px] font-normal block w-full rounded-[15px] bg-white h-[50px] px-[20px] py-[16px] outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-1 focus:-outline-offset-1 focus:outline-indigo-600 sm:text-sm/6"
        />
      </div>
    </div>
  )
})

export default InputText
