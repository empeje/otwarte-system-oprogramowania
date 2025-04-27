import { BalanceHistoryResponse } from '@/types/balance';
import { BalanceHistoryGenerator } from '@/utils/generators/balance';

export class BalanceService {
  static async getBalanceHistory(): Promise<BalanceHistoryResponse> {
    return BalanceHistoryGenerator.generateFixedBalanceHistory();
  }
} 