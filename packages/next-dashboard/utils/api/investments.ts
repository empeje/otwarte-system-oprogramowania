import { Investment } from '@/types/investment';
import { InvestmentGenerator } from '@/utils/generators/investments';

export class InvestmentService {
  static async getInvestments(): Promise<Investment[]> {
    return InvestmentGenerator.generateFixedInvestments();
  }

  static async getInvestmentById(id: string): Promise<Investment | null> {
    const investments = await this.getInvestments();
    return investments.find(investment => investment.id === id) || null;
  }
} 