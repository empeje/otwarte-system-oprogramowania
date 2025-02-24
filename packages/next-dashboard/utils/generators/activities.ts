import { faker } from '@faker-js/faker';
import { format, startOfWeek, addWeeks } from 'date-fns';
import type { Activity, ActivityType } from '@/types/activity';

export class ActivityGenerator {
  private static readonly ACTIVITY_TYPES: ActivityType[] = ['deposit', 'withdrawal'];

  private static generateWeeklyActivity(weekDate: Date, weekNumber: number, type: ActivityType): Activity {
    // Generate 3-7 transactions to aggregate
    const transactionCount = faker.number.int({ min: 3, max: 7 });
    const baseAmount = type === 'deposit' ? 500 : 100;
    const maxAmount = type === 'deposit' ? 5000 : 2000;
    
    // Sum up multiple transactions
    let totalAmount = 0;
    for (let i = 0; i < transactionCount; i++) {
      totalAmount += parseFloat(faker.finance.amount(baseAmount, maxAmount, 2));
    }
    
    return {
      id: faker.string.uuid(),
      type,
      amount: totalAmount,
      formattedAmount: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        signDisplay: type === 'deposit' ? 'always' : 'auto'
      }).format(type === 'deposit' ? totalAmount : -totalAmount),
      date: weekDate,
      formattedDate: format(weekDate, 'MMM dd, yyyy'),
      weekNumber,
      weekLabel: `Week ${weekNumber}`
    };
  }

  static generateActivitiesForPastWeeks(weeks: number = 12): Activity[] {
    const activities: Activity[] = [];
    const now = startOfWeek(new Date(), { weekStartsOn: 1 }); // Start from Monday
    
    // Generate one deposit and one withdrawal for each week
    for (let i = weeks - 1; i >= 0; i--) {
      const weekDate = addWeeks(now, -i);
      const weekNumber = weeks - i; // Relative week number (1-12)
      
      // Generate aggregated deposit for the week
      activities.push(this.generateWeeklyActivity(weekDate, weekNumber, 'deposit'));
      
      // Generate aggregated withdrawal for the week
      activities.push(this.generateWeeklyActivity(weekDate, weekNumber, 'withdrawal'));
    }
    
    return activities.sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  static generateFixedActivities(seed: number = 123): Activity[] {
    faker.seed(seed);
    const activities = this.generateActivitiesForPastWeeks();
    faker.seed(); // Reset the seed
    return activities;
  }
} 