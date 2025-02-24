export interface ExpenseCategory {
  category: string;
  amount: number;
  formattedAmount: string;
  percentage: number;
  count: number;
}

export interface ExpenseBreakdown {
  total: number;
  formattedTotal: string;
  categories: ExpenseCategory[];
} 