'use client';

import ItemTransaction from "@/components/cards/item-transaction";
import CardRounded from "@/components/cards/card-rounded";
import {Transaction} from "@/types/transaction";

export default function TransactionCard({transactions}: { transactions: Transaction[] }) {
  return (
    <CardRounded className={"flex flex-col gap-[12px] sm:gap-[10px] w-full overflow-x-hidden overflow-y-auto scrollbar-hide  max-h-[214px] sm:max-h-[230px]"}>
      {transactions.map((tx: Transaction, key) => (
        <ItemTransaction transaction={tx} key={key}/>
      ))}
    </CardRounded>
  )
}