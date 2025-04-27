import { ExpenseBreakdown } from '@/types/expense';
import { ExpenseGenerator } from '@/utils/generators/expenses';

export class ExpenseService {
  static async getExpenseBreakdown(): Promise<ExpenseBreakdown> {
    return ExpenseGenerator.generateFixedExpenseBreakdown();
  }
} 