import CreditCard from "@/components/cards/credit-card";
import SectionTitle from "@/components/page/section-title";
import Link from "next/link";
import PageContainer from "@/components/page/page-container";

export default function DashboardPage() {
  return (
    <div className="min-h-screen py-[24px] space-y-[22px] sm:space-y-[24px]">
      <div className={"px-0 sm:px-6 lg:px-10 grid grid-cols-2 xl:grid-cols-3 gap-x-[30px] gap-y-[24px]"}>
        <div className={"col-span-2 overflow-x-hidden scrollbar-hide"}>
          <div className={"px-4 sm:px-0 flex justify-between"}>
            <SectionTitle title={"My Cards"}/>
            <Link href={"/dashboard"}>
              <SectionTitle title={"See All"}/>
            </Link>
          </div>
          <div className={"pl-4 sm:px-0 flex space-x-[30px] overflow-x-auto scrollbar-hide"}>
            <CreditCard dark={true}/>
            <CreditCard/>
          </div>
        </div>

        <div className={"px-4 sm:px-0 col-span-2 xl:col-span-1"}>
          <SectionTitle title={"Recent Transaction"}/>
          <div className={"flex w-full overflow-x-auto scrollbar-hide"}>
            <CreditCard dark={true}/>
          </div>
        </div>
      </div>
      <PageContainer className={"grid grid-cols-1 sm:grid-cols-3 gap-x-[30px] gap-y-[24px]"}>
        <div className={"sm:col-span-2 bg-red-500"}>
          <div className={"flex justify-between"}>
            <SectionTitle title={"Weekly Activity"}/>
          </div>
        </div>

        <div className={"sm:col-span-1 bg-red-500"}>
          <SectionTitle title={"Expense Statistics"}/>
        </div>
      </PageContainer>

      <PageContainer className={"grid grid-cols-1 sm:grid-cols-5 gap-x-[30px] gap-y-[24px]"}>
        <div className={"sm:col-span-2 bg-red-500"}>
          <div className={"flex justify-between"}>
            <SectionTitle title={"Quick Transfer"}/>
          </div>
        </div>

        <div className={"sm:col-span-3 bg-red-500"}>
          <SectionTitle title={"Balance History"}/>
        </div>
      </PageContainer>
    </div>
  )
}