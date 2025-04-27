import { Loan } from '@/types/loan';
import { LoanGenerator } from '@/utils/generators/loans';

export class LoanService {
  static async getLoans(): Promise<Loan[]> {
    return LoanGenerator.generateFixedLoans();
  }

  static async getLoanById(id: string): Promise<Loan | null> {
    const loans = await this.getLoans();
    return loans.find(loan => loan.id === id) || null;
  }
} 