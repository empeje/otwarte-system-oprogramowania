import SectionTitle from "@/components/page/section-title";
import Section from "@/components/page/section";
import {TransactionService} from "@/utils/api/transactions";
import TransactionCard from "@/components/cards/transaction-card";

export default async function TransactionPage() {
  const [transactions] = await Promise.all([
    TransactionService.getTransactions(),
  ]);
  return (
    <div className="min-h-[calc(100vh-100px)] py-[24px] space-y-[22px] sm:space-y-[24px] sm:bg-[#F5F7FA]">
      <Section className={"!border-0 grid grid-cols-1 gap-x-[30px] gap-y-[24px]"}>
        <div className={"px-[25px] sm:px-0"}>
          <SectionTitle title={"Recent Transaction"}/>
          <TransactionCard transactions={transactions}/>
        </div>
      </Section>
    </div>
  )
}
