import {TransactionCategory} from "@/types/transaction";

export interface ExpenseCategory {
  name: string;
  category: TransactionCategory;
  amount: number;
  count: number;
  percentage: number;
  color: string;
  formattedAmount: string;
}

export interface ExpenseBreakdown {
  total: number;
  formattedTotal: string;
  categories: ExpenseCategory[];
} 