import SectionTitle from "@/components/page/section-title";
import Section from "@/components/page/section";
import {TransactionService} from "@/utils/api/transactions";
import {TransactionCategory, TransactionStatus, TransactionType} from "@/types/transaction";
import ItemTransaction from "@/components/cards/item-transaction";

const people = [
  {name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member'},
  // More people...
]

export default async function TransactionPage() {
  const [transactions] = await Promise.all([
    TransactionService.getTransactions(),
  ]);
  return (
    <div className="min-h-[calc(100vh-100px)] py-[24px] space-y-[22px] sm:space-y-[24px] sm:bg-[#F5F7FA]">
      <Section className={"!border-0 grid grid-cols-1"}>
        <div className={"flex justify-between"}>
          <SectionTitle title={"Quick Transfer"}/>
        </div>
        <div className="flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black/5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                  <tr>
                    <th scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Title
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Email
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Role
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                  {/*id: string;*/}
                  {/*cardId: string;*/}
                  {/*type: TransactionType;*/}
                  {/*category: TransactionCategory;*/}
                  {/*amount: number;*/}
                  {/*formattedAmount: string;*/}
                  {/*description: string;*/}
                  {/*merchantName: string;*/}
                  {/*merchantLogo?: string;*/}
                  {/*date: Date;*/}
                  {/*formattedDate: string;*/}
                  {/*status: TransactionStatus;*/}
                  {/*isCredit: boolean;*/}
                  {/*currency: string;*/}
                  {/*reference: string;*/}
                  <ItemTransaction transaction={tx} key={key}/>
                  {transactions.map((person) => (
                    <tr key={person.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {person.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.title}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.email}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.role}</td>
                      <td
                        className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                          Edit<span className="sr-only">, {person.name}</span>
                        </a>
                      </td>
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
