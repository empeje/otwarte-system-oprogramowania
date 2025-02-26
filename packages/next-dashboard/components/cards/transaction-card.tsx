'use client';

import ItemTransaction from "@/components/cards/item-transaction";
import CardRounded from "@/components/cards/card-rounded";

export default function TransactionCard() {
  return (
    <CardRounded className={"flex flex-col gap-[12px] sm:gap-[10px] w-full overflow-x-auto scrollbar-hide"}>
      <ItemTransaction/>
      <ItemTransaction/>
      <ItemTransaction/>
    </CardRounded>
  )
}