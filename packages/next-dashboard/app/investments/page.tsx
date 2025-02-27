import SectionTitle from "@/components/page/section-title";
import {InvestmentService} from "@/utils/api/investments";
import {Investment} from "@/types/investment";
import Section from "@/components/page/section";

export default async function InvestmentPage() {
  const data: Investment[] = await InvestmentService.getInvestments()

  return (
    <div className="min-h-[calc(100vh-135px)] sm:min-h-[calc(100vh-100px)] py-[24px] space-y-[22px] sm:space-y-[24px] sm:bg-[#F5F7FA]">
      <Section className={"!border-0 grid grid-cols-1 gap-x-[30px] gap-y-[24px]"}>
        <div className={"sm:px-0"}>
          <SectionTitle title={"Investments"}/>
          <div className="-mx-[1px] overflow-x-auto -my-2">
            <div className="inline-block min-w-full py-2 align-middle px-[1px]">
              <div className="overflow-hidden shadow ring-1 ring-black/5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Name
                    </th>
                    <th scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                      Symbol
                    </th>
                    <th scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                      Type
                    </th>
                    <th scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                      Status
                    </th>
                    <th scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                      Quantity
                    </th>
                    <th scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                      Profit Loss Percentage
                    </th>
                    <th scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                      Purchase Price
                    </th>
                    <th scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                      Current Price
                    </th>
                    <th scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                      Total Value
                    </th>
                    <th scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                      Profit Loss
                    </th>
                    <th scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                      Last Updated
                    </th>

                  </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                  {data?.map((person, key) => (
                    <tr key={key}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {person.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.symbol}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.type}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.status}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.quantity}</td>
                      <td
                        className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.profitLossPercentage}</td>
                      <td
                        className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.formattedPurchasePrice}</td>
                      <td
                        className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.formattedCurrentPrice}</td>
                      <td
                        className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.formattedTotalValue}</td>
                      <td
                        className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.formattedProfitLoss}</td>
                      <td
                        className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.formattedLastUpdated}</td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}
