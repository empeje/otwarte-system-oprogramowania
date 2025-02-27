import SectionTitle from "@/components/page/section-title";
import {AccountService} from "@/utils/api/accounts";
import {BankAccount} from "@/types/account";
import Section from "@/components/page/section";

export default async function AccountPage() {
  const accounts: BankAccount[] = await AccountService.getAccounts();

  return (
    <div
      className="min-h-[calc(100vh-135px)] sm:min-h-[calc(100vh-100px)] py-[24px] space-y-[22px] sm:space-y-[24px] sm:bg-[#F5F7FA]">
      <Section className={"!border-0 grid grid-cols-1 gap-x-[30px] gap-y-[24px]"}>
        <div className={"sm:px-0"}>
          <SectionTitle title={"Accounts"}/>
          <div className="-mx-[1px] overflow-x-auto -my-2">
            <div className="inline-block min-w-full py-2 align-middle px-[1px]">
              <div className="overflow-hidden shadow ring-1 ring-black/5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                  <tr>
                    <th scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Name
                    </th>
                    <th scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                      Account Number
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
                      Balance
                    </th>
                    <th scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                      Balance
                    </th>
                    <th scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                      Bank Name
                    </th>
                    <th scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                      Routing Number
                    </th>
                    <th scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                      Created
                    </th>
                    <th scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                      Currency
                    </th>
                  </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                  {accounts?.map((person, key) => (
                    <tr key={key}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {person.bankName}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.accountNumber}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.type}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.status}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.balance}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.formattedBalance}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.bankName}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.routingNumber}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.formattedDate}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.currency}</td>
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
