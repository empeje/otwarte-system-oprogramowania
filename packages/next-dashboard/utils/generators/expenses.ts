import { faker } from '@faker-js/faker';
import type { TransactionCategory } from '@/types/transaction';
import type { ExpenseBreakdown, ExpenseCategory } from '@/types/expense';

export class ExpenseGenerator {
  private static readonly CATEGORY_CONFIG: Array<{
    name: string;
    category: TransactionCategory;
    percentage: number;
    color: string;
  }> = [
    { name: 'Shopping', category: 'shopping', percentage: 25, color: '#2c3e50' },
    { name: 'Food & Dining', category: 'food', percentage: 20, color: '#e67e22' },
    { name: 'Bills & Utilities', category: 'bills', percentage: 15, color: '#3498db' },
    { name: 'Entertainment', category: 'entertainment', percentage: 12, color: '#9b59b6' },
    { name: 'Travel', category: 'travel', percentage: 10, color: '#1abc9c' },
    { name: 'Healthcare', category: 'healthcare', percentage: 8, color: '#e74c3c' },
    { name: 'Investment', category: 'investment', percentage: 6, color: '#4C6FFF' },
    { name: 'Others', category: 'others', percentage: 4, color: '#95a5a6' }
  ];

  static generateExpenseBreakdown(): ExpenseBreakdown {
    const totalExpense = 10000;
    const categories: ExpenseCategory[] = [];

    this.CATEGORY_CONFIG.forEach(({ name, category, percentage, color }) => {
      const amount = Math.round((totalExpense * percentage) / 100);

      categories.push({
        name,
        category,
        amount,
        count: faker.number.int({ min: 3, max: 12 }),
        percentage,
        color,
        formattedAmount: new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(amount)
      });
    });

    categories.sort((a, b) => b.percentage - a.percentage);

    return {
      total: totalExpense,
      formattedTotal: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(totalExpense),
      categories
    };
  }

  static generateFixedExpenseBreakdown(seed: number = 123): ExpenseBreakdown {
    faker.seed(seed);
    const breakdown = this.generateExpenseBreakdown();
    faker.seed();
    return breakdown;
  }
} 