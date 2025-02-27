'use client';

import ItemProfile from "@/components/cards/item-profile";
import {Icons} from "@/components/icons/icons";
import InputTransfer from "@/components/forms/input-transfer";
import CardRounded from "@/components/cards/card-rounded";
import {Contact} from "@/types/contact";

export default function TransferCard({contacts}: { contacts: Contact[] }) {
  return (
    <CardRounded className={"w-full space-y-[22px] sm:space-y-[30px] py-[20] sm:py-[35px] sm:min-h-[276px]"}>
      <div className={"relative"}>
        <div className={"flex gap-[21px] sm:gap-[28px] overflow-x-auto scrollbar-hide"}>
          {contacts.map((contact: Contact, key) => (
            <ItemProfile contact={contact} key={key}/>
          ))}
        </div>
        <button
          className={"absolute right-0 top-1/2 -translate-y-1/2 size-[40px] sm:size-[50px] rounded-full flex items-center justify-center shadow-[4px_4px_18px_-2px_#E7E4E8CC] bg-white"}>
          <Icons.ChevronRight/>
        </button>
      </div>
      <div className={"flex items-center gap-[25px] sm:gap-[27px]"}>
        <div className={"text-[#718EBF] text-[12px] sm:text-[16px] leading-[20px] font-normal"}>
          Write Amount
        </div>
        <InputTransfer/>
      </div>
    </CardRounded>
  )
}