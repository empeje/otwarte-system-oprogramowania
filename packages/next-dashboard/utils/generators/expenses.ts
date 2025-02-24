import { faker } from '@faker-js/faker';
import type { TransactionCategory } from '@/types/transaction';
import type { ExpenseBreakdown, ExpenseCategory } from '@/types/expense';

export class ExpenseGenerator {
  private static readonly CATEGORY_CONFIG: Array<{
    category: TransactionCategory;
    percentage: number;
  }> = [
    { category: 'shopping', percentage: 25 },
    { category: 'food', percentage: 20 },
    { category: 'bills', percentage: 15 },
    { category: 'entertainment', percentage: 12 },
    { category: 'travel', percentage: 10 },
    { category: 'healthcare', percentage: 8 },
    { category: 'investment', percentage: 6 },
    { category: 'others', percentage: 4 }
  ];

  static generateExpenseBreakdown(): ExpenseBreakdown {
    // Generate a reasonable total expense (e.g., $10,000)
    const totalExpense = 10000;
    const categories: ExpenseCategory[] = [];

    // Generate amounts based on fixed percentages
    this.CATEGORY_CONFIG.forEach(({ category, percentage }) => {
      // Calculate exact amount from percentage
      const amount = Math.round((totalExpense * percentage) / 100);

      categories.push({
        category,
        amount,
        count: faker.number.int({ min: 3, max: 12 }),
        percentage,
        formattedAmount: new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(amount)
      });
    });

    // Sort by percentage descending
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
    faker.seed(); // Reset the seed
    return breakdown;
  }
} 