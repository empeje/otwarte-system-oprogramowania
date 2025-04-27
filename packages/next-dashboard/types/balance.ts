export interface BalanceHistory {
  date: Date;
  formattedDate: string;
  balance: number;
  formattedBalance: string;
  change: number;
  formattedChange: string;
  isPositive: boolean;
}

export interface BalanceHistoryResponse {
  currentBalance: number;
  formattedBalance: string;
  history: BalanceHistory[];
} 