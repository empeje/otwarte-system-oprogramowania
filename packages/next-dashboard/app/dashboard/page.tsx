import { ActivityService } from '@/utils/api/activities';
import { ExpenseService } from '@/utils/api/expenses';
import { WeeklyActivityWrapper } from '@/components/charts/WeeklyActivityWrapper';
import { ExpenseStatisticsWrapper } from '@/components/charts/ExpenseStatisticsWrapper';

export default async function DashboardPage() {
  const [activities, expenses] = await Promise.all([
    ActivityService.getActivities(),
    ExpenseService.getExpenseBreakdown()
  ]);

  const weeklyTotals = ActivityService.getWeeklyTotals(activities);
  
  // Transform the data for the chart
  const weeklyActivityData = Object.entries(weeklyTotals).map(([week, data]) => ({
    week,
    deposits: data.deposits,
    withdrawals: data.withdrawals,
  }));

  const expenseData = [
    { category: 'Entertain', percentage: 30, color: '#2c3e50' },
    { category: 'Bill Expense', percentage: 15, color: '#e67e22' },
    { category: 'Investment', percentage: 20, color: '#4C6FFF' },
    { category: 'Others', percentage: 35, color: '#000000' }
  ];

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6">Financial Dashboard</h1>
      
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Weekly Activity</h2>
          <WeeklyActivityWrapper data={weeklyActivityData} />
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Expense Statistics</h2>
          <div className="flex justify-center">
            <ExpenseStatisticsWrapper data={expenseData} />
          </div>
        </div>
      </div>
    </div>
  );
} 