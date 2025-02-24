export type TransactionType = 'deposit' | 'withdrawal' | 'transfer' | 'payment';
export type TransactionStatus = 'completed' | 'pending' | 'failed';
export type TransactionCategory = 
  | 'entertainment'
  | 'shopping'
  | 'travel'
  | 'food'
  | 'bills'
  | 'healthcare'
  | 'investment'
  | 'others';

export interface Transaction {
  id: string;
  cardId: string;
  type: TransactionType;
  category: TransactionCategory;
  amount: number;
  formattedAmount: string;
  description: string;
  merchantName: string;
  merchantLogo?: string;
  date: Date;
  formattedDate: string;
  status: TransactionStatus;
  isCredit: boolean;
  currency: string;
  reference: string;
} 