export type ContactStatus = 'active' | 'inactive' | 'pending';
export type ContactType = 'personal' | 'business';

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: ContactType;
  status: ContactStatus;
  accountNumber: string;
  bankName: string;
  avatar: string;
  createdAt: Date;
  formattedDate: string;
  recentTransactions: number;
  totalTransferred: number;
  formattedTotal: string;
} 