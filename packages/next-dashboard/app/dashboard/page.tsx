import Link from "next/link";
import CreditCard from "@/components/cards/credit-card";
import SectionTitle from "@/components/page/section-title";
import Section from "@/components/page/section";
import {ActivityService} from "@/utils/api/activities";
import {ExpenseService} from "@/utils/api/expenses";
import {BalanceService} from "@/utils/api/balance";
import {BalanceHistoryWrapper} from "@/components/charts/BalanceHistoryWrapper";
import {WeeklyActivityWrapper} from "@/components/charts/WeeklyActivityWrapper";
import {ExpenseStatisticsWrapper} from "@/components/charts/ExpenseStatisticsWrapper";
import CardRounded from "@/components/cards/card-rounded";
import TransferCard from "@/components/cards/transfer-card";
import TransactionCard from "@/components/cards/transaction-card";
import {CardService} from "@/utils/api/cards";
import {TransactionService} from "@/utils/api/transactions";
import {ContactService} from "@/utils/api/contacts";
import {classNames} from "@/utils/helper";

export default async function DashboardPage() {
  const [activities, expenses, balanceHistory, cards, transactions, contacts,] = await Promise.all([
    ActivityService.getActivities(),
    ExpenseService.getExpenseBreakdown(),
    BalanceService.getBalanceHistory(),
    CardService.getCards(),
    TransactionService.getTransactions(),
    ContactService.getContacts(),
  ]);

  const weeklyTotals = ActivityService.getWeeklyTotals(activities);

  const weeklyActivityData = Object.entries(weeklyTotals).map(([week, data]) => ({
    week,
    deposits: data.deposits,
    withdrawals: data.withdrawals,
  }));

  // Transform expense data to match the chart format
  const expenseData = expenses.categories.map(category => ({
    category: category.name,
    percentage: category.percentage,
    color: category.color
  }));

  return (
    <div className="min-h-[calc(100vh-135px)] sm:min-h-[calc(100vh-100px)]  py-[24px] space-y-[22px] sm:space-y-[24px] sm:bg-[#F5F7FA]">
      <div className={"px-0 sm:px-6 lg:px-10 grid grid-cols-2 xl:grid-cols-3 gap-x-[30px] gap-y-[24px]"}>
        <div className={"col-span-2 overflow-x-hidden scrollbar-hide"}>
          <div className={"px-[25px] sm:px-0 flex justify-between"}>
            <SectionTitle title={"My Cards"}/>
            <Link href={"/credit-cards"}>
              <SectionTitle title={"See All"}/>
            </Link>
          </div>
          <div className={"pl-[25px] sm:px-0 flex space-x-[30px] overflow-x-auto scrollbar-hide"}>
            {cards.map((card, index) => (
              <CreditCard card={card} key={index} className={classNames(
                "w-[265px] sm:w-[350px]",
                "h-[170px] sm:h-[235px]",
              )}/>
            ))}
          </div>
        </div>

        <div className={"px-[25px] sm:px-0 col-span-2 xl:col-span-1"}>
          <SectionTitle title={"Recent Transaction"}/>
          <TransactionCard transactions={transactions}/>
        </div>
      </div>
      <Section className={"!border-0 grid grid-cols-1 lg:grid-cols-3 gap-x-[30px] gap-y-[24px]"}>
        <div className={"lg:col-span-2"}>
          <div className={"flex justify-between"}>
            <SectionTitle title={"Weekly Activity"}/>
          </div>
          <CardRounded className={"!p-0 overflow-hidden"}>
            <WeeklyActivityWrapper data={weeklyActivityData}/>
          </CardRounded>
        </div>

        <div className={"lg:col-span-1"}>
          <SectionTitle title={"Expense Statistics"}/>
          <CardRounded className={"!p-0 overflow-hidden"}>
            <ExpenseStatisticsWrapper data={expenseData}/>
          </CardRounded>
        </div>
      </Section>

      <Section className={"!border-0 grid grid-cols-1 xl:grid-cols-5 gap-x-[30px] gap-y-[24px]"}>
        <div className={"xl:col-span-2"}>
          <div className={"flex justify-between"}>
            <SectionTitle title={"Quick Transfer"}/>
          </div>
          <TransferCard contacts={contacts}/>
        </div>

        <div className={"xl:col-span-3"}>
          <SectionTitle title={"Balance History"}/>
          <CardRounded className={"!p-0 overflow-hidden"}>
            <BalanceHistoryWrapper data={balanceHistory.history}/>
          </CardRounded>
        </div>
      </Section>
    </div>
  )
}