import SectionTitle from "@/components/page/section-title";
import CreditCard from "@/components/cards/credit-card";
import {CardService} from "@/utils/api/cards";

export default async function CardPage() {
  const [cards] = await Promise.all([
    CardService.getCards(),
  ]);

  return (
    <div className="min-h-[calc(100vh-100px)]  py-[24px] space-y-[22px] sm:space-y-[24px] sm:bg-[#F5F7FA]">
      <div className={"px-0 sm:px-6 lg:px-10 grid grid-cols-2 xl:grid-cols-3 gap-x-[30px] gap-y-[24px]"}>
        <div className={"col-span-2 overflow-x-hidden scrollbar-hide"}>
          <div className={"px-[25px] sm:px-0 flex justify-between"}>
            <SectionTitle title={"My Cards"}/>
          </div>
          <div className={"pl-[25px] sm:px-0 flex space-x-[30px] overflow-x-auto scrollbar-hide"}>
            {cards.map((card, index) => (
              <CreditCard card={card} key={index}/>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}