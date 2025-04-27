import { BankAccount } from '@/types/account';
import { AccountGenerator } from '@/utils/generators/accounts';

export class AccountService {
  static async getAccounts(): Promise<BankAccount[]> {
    return AccountGenerator.generateFixedAccounts();
  }

  static async getAccountById(id: string): Promise<BankAccount | null> {
    const accounts = await this.getAccounts();
    return accounts.find(account => account.id === id) || null;
  }
} 