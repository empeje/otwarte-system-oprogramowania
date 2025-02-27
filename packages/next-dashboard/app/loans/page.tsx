import SectionTitle from "@/components/page/section-title";
import {Loan } from '@/types/loan';
import Section from "@/components/page/section";
import {LoanService} from "@/utils/api/loans";

export default async function LoanPage() {
  const data: Loan[] = await LoanService.getLoans();

  return (
    <div
      className="min-h-[calc(100vh-135px)] sm:min-h-[calc(100vh-100px)] py-[24px] space-y-[22px] sm:space-y-[24px] sm:bg-[#F5F7FA]">
      <Section className={"!border-0 grid grid-cols-1 gap-x-[30px] gap-y-[24px]"}>
        <div className={"sm:px-0"}>
          <SectionTitle title={"Loans"}/>
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle px-[20px] sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black/5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Type
                    </th>
                    <th scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                      Status
                    </th>
                    <th scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                      Amount
                    </th>
                    <th scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                      Remaining Balance
                    </th>
                    <th scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                      Interest Rate
                    </th>
                    <th scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                      Term
                    </th>
                    <th scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                      Monthly Payment
                    </th>
                    <th scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                      Start Date
                    </th>
                    <th scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                      Next Payment Date
                    </th>
                    <th scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                      Formatted Amount
                    </th>
                    <th scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                      Formatted Remaining Balance
                    </th>
                    <th scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                      Formatted Monthly Payment
                    </th>
                    <th scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                      Formatted Start Date
                    </th>
                    <th scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                      Formatted Next Payment Date
                    </th>
                    <th scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                      Progress
                    </th>
                  </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                  {data?.map((person, key) => (
                    <tr key={key}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {person.type}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.status}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.amount}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.remainingBalance}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.interestRate}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.term}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.monthlyPayment}</td>
                      <td
                        className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.startDate.toLocaleDateString()}</td>
                      <td
                        className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.nextPaymentDate.toLocaleDateString()}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.formattedAmount}</td>
                      <td
                        className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.formattedRemainingBalance}</td>
                      <td
                        className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.formattedMonthlyPayment}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.formattedStartDate}</td>
                      <td
                        className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.formattedNextPaymentDate}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.progress}</td>
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
