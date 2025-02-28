import SectionTitle from "@/components/page/section-title";
import Section from "@/components/page/section";
import {PrivilegeService} from "@/utils/api/privileges";
import {Privilege} from "@/types/privilege";

export default async function PrivilegePage() {
  const data: Privilege[] = await PrivilegeService.getPrivileges();

  return (
    <div
      className="min-h-[calc(100vh-135px)] sm:min-h-[calc(100vh-100px)] py-[24px] space-y-[22px] sm:space-y-[24px] sm:bg-[#F5F7FA]">
      <Section className={"!border-0 grid grid-cols-1 gap-x-[30px] gap-y-[24px]"}>
        <div className={"sm:px-0"}>
          <SectionTitle title={"Privileges"}/>
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
                      Level
                    </th>
                    <th scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                      Category
                    </th>
                    <th scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                      Description
                    </th>
                    <th scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                      Points
                    </th>
                    <th scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                      Required Points
                    </th>
                    <th scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                      Benefits
                    </th>
                    <th scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                      Progress
                    </th>
                    <th scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                      Valid Until
                    </th>

                  </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                  {data?.map((person, key) => (
                    <tr key={key}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {person.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.level}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.category}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.description}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.points}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.requiredPoints}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.benefits}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.progress.toFixed(2)}%</td>
                      <td
                        className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.formattedValidUntil}</td>
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