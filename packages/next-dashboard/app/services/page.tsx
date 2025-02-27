import SectionTitle from "@/components/page/section-title";
import Section from "@/components/page/section";
import {ServiceService} from "@/utils/api/services";
import {Service, } from "@/types/service";

export default async function InvestmentPage() {
  const data: Service[] = await ServiceService.getServices();

  return (
    <div
      className="min-h-[calc(100vh-135px)] sm:min-h-[calc(100vh-100px)] py-[24px] space-y-[22px] sm:space-y-[24px] sm:bg-[#F5F7FA]">
      <Section className={"!border-0 grid grid-cols-1 gap-x-[30px] gap-y-[24px]"}>
        <div className={"sm:px-0"}>
          <SectionTitle title={"Services"}/>
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle px-[20px] sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black/5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Name
                    </th>
                    <th scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                      Category
                    </th>
                    <th scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                      Status
                    </th>
                    <th scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                      Description
                    </th>
                    <th scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                      Monthly Fee
                    </th>
                    <th scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                      Billing Date
                    </th>
                    <th scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                      Enrollment Date
                    </th>
                    <th scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                      Features
                    </th>
                    <th scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                      Formatted Monthly Fee
                    </th>
                    <th scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                      Formatted Billing Date
                    </th>
                    <th scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                      Formatted Enrollment Date
                    </th>
                    <th scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                      Is Auto Renew
                    </th>
                  </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                  {data?.map((person, key) => (
                    <tr key={key}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {person.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.category}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.status}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.description}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.monthlyFee}</td>
                      <td
                        className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.billingDate.toLocaleDateString()}</td>
                      <td
                        className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.enrollmentDate.toLocaleDateString()}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.features}</td>
                      <td
                        className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.formattedMonthlyFee}</td>
                      <td
                        className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.formattedBillingDate}</td>
                      <td
                        className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.formattedEnrollmentDate}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.isAutoRenew}</td>
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
