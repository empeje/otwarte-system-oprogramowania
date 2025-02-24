import { ActivityService } from '@/utils/api/activities';
import { WeeklyActivityWrapper } from '@/components/charts/WeeklyActivityWrapper';

export default async function DashboardPage() {
  const activities = await ActivityService.getActivities();
  const weeklyTotals = ActivityService.getWeeklyTotals(activities);
  
  // Transform the data for the chart
  const weeklyActivityData = Object.entries(weeklyTotals).map(([week, data]) => ({
    week,
    deposits: data.deposits,
    withdrawals: data.withdrawals,
  }));

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6">Financial Dashboard</h1>
      
      <div className="grid gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Weekly Activity</h2>
          <WeeklyActivityWrapper data={weeklyActivityData} />
        </div>
      </div>
    </div>
  );
} 