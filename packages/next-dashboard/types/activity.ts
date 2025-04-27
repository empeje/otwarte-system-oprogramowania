export type ActivityType = 'deposit' | 'withdrawal';

export interface Activity {
  id: string;
  type: ActivityType;
  amount: number;
  formattedAmount: string;
  date: Date;
  formattedDate: string;
  weekNumber: number;
  weekLabel: string;
} 