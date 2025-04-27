import SectionTitle from "@/components/page/section-title";
import Section from "@/components/page/section";
import {TransactionService} from "@/utils/api/transactions";
import CardRounded from "@/components/cards/card-rounded";
import ItemTransaction from "@/components/cards/item-transaction";
import {Transaction} from "@/types/transaction";

export default async function TransactionPage() {
  const transactions = await TransactionService.getTransactions();
  return (
    <div className="min-h-[calc(100vh-135px)] sm:min-h-[calc(100vh-100px)] py-[24px] space-y-[22px] sm:space-y-[24px] sm:bg-[#F5F7FA]">
      <Section className={"!border-0 grid grid-cols-1 gap-x-[30px] gap-y-[24px]"}>
        <div className={"sm:px-0"}>
          <SectionTitle title={"Transaction"}/>
          <CardRounded className={"flex flex-col gap-[12px] sm:gap-[10px] w-full overflow-x-hidden overflow-y-auto scrollbar-hide max-h-[calc(100vh-135px-100px)] sm:max-h-[calc(100vh-100px-100px)]"}>
            {transactions.map((tx: Transaction, key) => (
              <ItemTransaction transaction={tx} key={key}/>
            ))}
          </CardRounded>
        </div>
      </Section>
    </div>
  )
}
