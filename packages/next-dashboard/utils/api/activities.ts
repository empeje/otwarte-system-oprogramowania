import { Activity } from '@/types/activity';
import { ActivityGenerator } from '@/utils/generators/activities';

export class ActivityService {
  static async getActivities(): Promise<Activity[]> {
    return ActivityGenerator.generateFixedActivities();
  }

  static async getActivityById(id: string): Promise<Activity | null> {
    const activities = await this.getActivities();
    return activities.find(activity => activity.id === id) || null;
  }

  static getWeeklyTotals(activities: Activity[]) {
    return activities.reduce((acc, activity) => {
      const week = activity.weekLabel;
      if (!acc[week]) {
        acc[week] = { deposits: 0, withdrawals: 0 };
      }
      if (activity.type === 'deposit') {
        acc[week].deposits += activity.amount;
      } else {
        acc[week].withdrawals += activity.amount;
      }
      return acc;
    }, {} as Record<string, { deposits: number; withdrawals: number }>);
  }
} 