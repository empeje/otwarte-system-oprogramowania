'use client';

import {Icons} from "@/components/icons/icons";
import React, {FormEvent, useMemo, useState} from "react";
import ModalDialog from "@/components/alert/modal-dialog";

export default function InputTransfer({disabled=true}: {disabled: boolean}) {
  const [open, setOpen] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOpen(true);
    e.currentTarget.reset();
  }

  const setClose = () => {
    setOpen(false)
  }

  const [amount, setAmount] = useState<string>("0");

  const buttonDisabled = useMemo(() => {
    return !parseFloat(amount) || disabled;
  }, [amount, disabled])

  return (
    <>
      <ModalDialog
        open={open}
        setOpen={() => {
          setClose()
        }}
        title={"Thank You!"}
        content={"You have success transfer"}
      />
      <form
        onSubmit={onSubmit}
        className="grid flex-1 grid-cols-1 bg-[#F5F7FA] h-[40px] sm:h-[50px] pl-[15px] sm:pl-[25px] rounded-[40px]">
        <input
          onChange={(event) => {
            setAmount(event.currentTarget.value)
          }}
          name="search"
          type="number"
          required={true}
          placeholder="525.50"
          className="bg-transparent col-start-1 row-start-1 block size-full pr-8 text-[15px] text-gray-900 outline-none placeholder:text-[#8BA3CB] sm:text-[15px]"
        />
        <button
          type={"submit"}
          disabled={buttonDisabled}
          className={"disabled:bg-[#232323]/[0.7] col-start-2 row-start-1 flex items-center px-[21px] sm:px-[24px] justify-between bg-[#232323] shadow-[4px_4px_18px_-2px_#E7E4E8CC] w-[100px] sm:w-[125px] h-full rounded-[40px]"}>
          <div className={"text-[13px] sm:text-[16px] font-semibold leading-[20px] text-white"}>
            Send
          </div>
          <Icons.PlaneOutline
            aria-hidden="true"
            className="pointer-events-none h-[14px] sm:h-[22px] w-auto self-center text-[#718EBF] object-fill flex-shrink-0"
          />
        </button>
      </form>
    </>
  )
}