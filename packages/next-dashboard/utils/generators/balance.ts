import { faker } from '@faker-js/faker';
import { format, subDays } from 'date-fns';
import type { BalanceHistory, BalanceHistoryResponse } from '@/types/balance';

export class BalanceHistoryGenerator {
  static generateDailyBalance(
    date: Date,
    previousBalance: number
  ): BalanceHistory {
    // Generate a random change between -500 and 1000
    const change = parseFloat(
      faker.finance.amount(-500, 1000, 2, { autoNegative: true })
    );
    const balance = previousBalance + change;

    return {
      date,
      formattedDate: format(date, 'MMM dd, yyyy'),
      balance,
      formattedBalance: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(balance),
      change,
      formattedChange: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        signDisplay: 'always'
      }).format(change),
      isPositive: change >= 0
    };
  }

  static generateBalanceHistory(days: number = 30): BalanceHistoryResponse {
    const history: BalanceHistory[] = [];
    const startingBalance = parseFloat(faker.finance.amount(5000, 10000, 2));
    let currentBalance = startingBalance;
    
    // Generate daily balances for the past 'days'
    for (let i = days - 1; i >= 0; i--) {
      const date = subDays(new Date(), i);
      const dailyBalance = this.generateDailyBalance(date, currentBalance);
      history.push(dailyBalance);
      currentBalance = dailyBalance.balance;
    }

    return {
      currentBalance,
      formattedBalance: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(currentBalance),
      history: history.sort((a, b) => b.date.getTime() - a.date.getTime()) // Sort by date desc
    };
  }

  static generateFixedBalanceHistory(seed: number = 123): BalanceHistoryResponse {
    faker.seed(seed);
    const history = this.generateBalanceHistory();
    faker.seed(); // Reset the seed
    return history;
  }
} 