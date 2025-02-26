import { faker } from '@faker-js/faker';
import { format, subDays } from 'date-fns';
import type { BalanceHistory, BalanceHistoryResponse } from '@/types/balance';

export class BalanceHistoryGenerator {
  static generateDailyBalance(
    date: Date,
    previousBalance: number
  ): BalanceHistory {
    // Increase volatility range significantly
    const volatilityFactor = faker.number.float({ min: 0.5, max: 2.5 });

    // 50/50 chance of up/down for more randomness
    const isUpDay = faker.number.float({ min: 0, max: 1 }) < 0.5;

    // Increase base change range significantly
    const baseChange = parseFloat(
      faker.finance.amount({min: 3000, max: 8000, dec: 2})
    );

    // Apply direction and volatility
    let finalChange = baseChange * volatilityFactor * (isUpDay ? 1 : -1);

    // Increase frequency and magnitude of spikes (25% chance)
    const spikeChance = faker.number.float({ min: 0, max: 1 });
    if (spikeChance > 0.75) {
      // Extreme spike (3-5x)
      const multiplier = faker.number.float({ min: 3, max: 5 });
      finalChange *= multiplier;
    } else if (spikeChance > 0.5) {
      // Moderate spike (2-3x)
      const multiplier = faker.number.float({ min: 2, max: 3 });
      finalChange *= multiplier;
    }

    // Calculate new balance with wider limits
    const minBalance = 50000;  // Lower minimum
    const maxBalance = 400000; // Higher maximum
    const newBalance = Math.max(
      Math.min(previousBalance + finalChange, maxBalance),
      minBalance
    );

    // Adjust final change based on balance constraints
    finalChange = newBalance - previousBalance;

    return {
      date,
      formattedDate: format(date, 'MMM dd, yyyy'),
      balance: newBalance,
      formattedBalance: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(newBalance),
      change: finalChange,
      formattedChange: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        signDisplay: 'always'
      }).format(finalChange),
      isPositive: finalChange >= 0
    };
  }

  static generateBalanceHistory(days: number = 180): BalanceHistoryResponse {
    const history: BalanceHistory[] = [];
    // Start with a middle-range balance
    const startingBalance = 200000; // Higher starting point
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
      history: history.sort((a, b) => a.date.getTime() - b.date.getTime())
    };
  }

  static generateFixedBalanceHistory(seed: number = 123): BalanceHistoryResponse {
    faker.seed(seed);
    const history = this.generateBalanceHistory();
    faker.seed();
    return history;
  }
} 