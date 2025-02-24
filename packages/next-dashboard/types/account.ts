export type AccountType = 'checking' | 'savings' | 'business';
export type AccountStatus = 'active' | 'inactive' | 'frozen';

export interface BankAccount {
  id: string;
  accountNumber: string;
  type: AccountType;
  status: AccountStatus;
  balance: number;
  formattedBalance: string;
  bankName: string;
  routingNumber: string;
  isDefault: boolean;
  createdAt: Date;
  formattedDate: string;
  currency: string;
} 