import {ActivityService} from '@/utils/api/activities';
import {ExpenseService} from '@/utils/api/expenses';
import {BalanceService} from '@/utils/api/balance';
import {WeeklyActivityWrapper} from '@/components/charts/WeeklyActivityWrapper';
import {ExpenseStatisticsWrapper} from '@/components/charts/ExpenseStatisticsWrapper';
import {BalanceHistoryWrapper} from '@/components/charts/BalanceHistoryWrapper';
import Container from "@/components/page/container";

export default async function DashboardPage() {
  const [activities, expenses, balanceHistory] = await Promise.all([
    ActivityService.getActivities(),
    ExpenseService.getExpenseBreakdown(),
    BalanceService.getBalanceHistory()
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
    <Container className="min-h-[calc(100vh-100px)]  py-[24px]">
      <h1 className="text-2xl font-bold mb-6">Financial Dashboard</h1>

      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Balance History</h2>
          <BalanceHistoryWrapper data={balanceHistory.history}/>
        </div>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Weekly Activity</h2>
            <WeeklyActivityWrapper data={weeklyActivityData}/>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Expense Statistics</h2>
            <div className="flex justify-center">
              <ExpenseStatisticsWrapper data={expenseData}/>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}