'use client';

import { useRef, useState } from "react";
import ItemProfile from "@/components/cards/item-profile";
import { Icons } from "@/components/icons/icons";
import InputTransfer from "@/components/forms/input-transfer";
import CardRounded from "@/components/cards/card-rounded";
import { Contact } from "@/types/contact";
import {classNames} from "@/utils/helper";

export default function TransferCard({ contacts }: { contacts: Contact[] }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    if (!isAtEnd) {
      container.scrollBy({ left: 200, behavior: "smooth" });

      if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
        setIsAtEnd(true);
      }
    } else {
      container.scrollTo({ left: 0, behavior: "smooth" });
      setIsAtEnd(false);
    }
  };

  const [profileActive, setProfileActive] = useState<string>();

  return (
    <CardRounded className="w-full space-y-[22px] sm:space-y-[30px] py-[20px] sm:py-[35px] sm:min-h-[276px]">
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex gap-[21px] sm:gap-[28px] overflow-x-auto scrollbar-hide scroll-smooth"
        >
          {contacts.map((contact: Contact, key) => (
            <button key={key} onClick={() => {
              if (profileActive === contact.id) {
                setProfileActive(undefined)
              } else {
                setProfileActive(contact.id)
              }
            }}>
              <ItemProfile contact={contact} active={profileActive === contact.id}/>
            </button>
          ))}
        </div>
        <button
          onClick={handleScroll}
          className="absolute right-0 top-1/2 -translate-y-1/2 size-[40px] sm:size-[50px] rounded-full flex items-center justify-center shadow-[4px_4px_18px_-2px_#E7E4E8CC] bg-white"
        >
          <Icons.ChevronRight className={
            classNames(
              isAtEnd && "rotate-180",
              "transition transition-all duration-300"
            )
          } />
        </button>
      </div>
      <div className="flex items-center gap-[25px] sm:gap-[27px]">
        <div className="text-[#718EBF] text-[12px] sm:text-[16px] leading-[20px] font-normal">
          Write Amount
        </div>
        <InputTransfer disabled={!profileActive}/>
      </div>
    </CardRounded>
  );
}
