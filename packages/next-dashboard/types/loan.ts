export type LoanType = 'personal' | 'mortgage' | 'auto' | 'student' | 'business';
export type LoanStatus = 'active' | 'paid' | 'defaulted' | 'pending';

export interface Loan {
  id: string;
  type: LoanType;
  status: LoanStatus;
  amount: number;
  remainingBalance: number;
  interestRate: number;
  term: number; // in months
  monthlyPayment: number;
  startDate: Date;
  nextPaymentDate: Date;
  formattedAmount: string;
  formattedRemainingBalance: string;
  formattedMonthlyPayment: string;
  formattedStartDate: string;
  formattedNextPaymentDate: string;
  progress: number; // percentage paid
} 