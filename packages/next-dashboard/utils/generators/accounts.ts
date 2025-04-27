import { faker } from '@faker-js/faker';
import { format } from 'date-fns';
import type { BankAccount, AccountType, AccountStatus } from '@/types/account';

export class AccountGenerator {
  private static readonly ACCOUNT_TYPES: AccountType[] = ['checking', 'savings', 'business'];
  private static readonly ACCOUNT_STATUS: AccountStatus[] = ['active', 'inactive', 'frozen'];
  private static readonly BANK_NAMES = [
    'Chase Bank',
    'Bank of America',
    'Wells Fargo',
    'Citibank',
    'Capital One',
    'Goldman Sachs',
    'US Bank',
    'TD Bank'
  ];

  static generateAccount(): BankAccount {
    const balance = parseFloat(faker.finance.amount({min: 5000, max: 100000, dec: 2}));
    const createdAt = faker.date.past({ years: 3 });

    return {
      id: faker.string.uuid(),
      accountNumber: faker.finance.accountNumber(12),
      type: faker.helpers.arrayElement(this.ACCOUNT_TYPES),
      status: faker.helpers.arrayElement(this.ACCOUNT_STATUS),
      balance,
      formattedBalance: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(balance),
      bankName: faker.helpers.arrayElement(this.BANK_NAMES),
      routingNumber: faker.finance.routingNumber(),
      isDefault: false,
      createdAt,
      formattedDate: format(createdAt, 'MMM dd, yyyy'),
      currency: 'USD'
    };
  }

  static generateFixedAccounts(seed: number = 123): BankAccount[] {
    faker.seed(seed);
    const accounts = Array.from({ length: 3 }, () => this.generateAccount());
    accounts[0].isDefault = true; // Make first account default
    faker.seed();
    return accounts;
  }
} 