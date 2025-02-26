import { faker } from '@faker-js/faker';
import type { Transaction, TransactionType, TransactionStatus, TransactionCategory } from '@/types/transaction';
import { format } from 'date-fns';

export class TransactionGenerator {
  private static readonly TRANSACTION_TYPES: TransactionType[] = ['deposit', 'withdrawal', 'transfer', 'payment'];
  private static readonly TRANSACTION_STATUS: TransactionStatus[] = ['completed', 'pending', 'failed'];
  private static readonly TRANSACTION_CATEGORIES: TransactionCategory[] = [
    'entertainment',
    'shopping',
    'travel',
    'food',
    'bills',
    'healthcare',
    'investment',
    'others'
  ];

  private static readonly MERCHANTS = {
    entertainment: ['Netflix', 'Spotify', 'Disney+', 'HBO Max'],
    shopping: ['Amazon', 'eBay', 'Walmart', 'Target'],
    travel: ['Uber', 'Airbnb', 'Expedia', 'Delta'],
    food: ['McDonald\'s', 'Uber Eats', 'Starbucks', 'Chipotle'],
    bills: ['AT&T', 'Verizon', 'PG&E', 'Comcast'],
    healthcare: ['CVS', 'Walgreens', 'Kaiser', 'Blue Cross'],
    investment: ['Robinhood', 'Coinbase', 'Fidelity', 'E*TRADE'],
    others: ['PayPal', 'Venmo', 'Cash App', 'Apple']
  };

  static generateTransaction(cardId: string): Transaction {
    const category = faker.helpers.arrayElement(this.TRANSACTION_CATEGORIES);
    const type = faker.helpers.arrayElement(this.TRANSACTION_TYPES);
    const isCredit = type === 'deposit';
    const amount = parseFloat(faker.finance.amount({min: 10, max: 1000, dec: 2}));
    const date = faker.date.recent({ days: 30 });
    
    return {
      id: faker.string.uuid(),
      cardId,
      type,
      category,
      amount,
      formattedAmount: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        signDisplay: isCredit ? 'always' : 'auto'
      }).format(isCredit ? amount : -amount),
      description: faker.finance.transactionDescription(),
      merchantName: faker.helpers.arrayElement(this.MERCHANTS[category]),
      merchantLogo: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(this.MERCHANTS[category][0])}`,
      date,
      formattedDate: format(date, 'MMM dd, yyyy HH:mm'),
      status: faker.helpers.arrayElement(this.TRANSACTION_STATUS),
      isCredit,
      currency: 'USD',
      reference: faker.string.alphanumeric(10).toUpperCase()
    };
  }

  static generateTransactions(cardId: string, count: number): Transaction[] {
    return Array.from({ length: count }, () => this.generateTransaction(cardId));
  }

  // Generate a fixed set of transactions for consistent data across refreshes
  static generateFixedTransactions(cardId: string, seed: number = 123): Transaction[] {
    faker.seed(seed);
    const transactions = this.generateTransactions(cardId, 10); // Generate 10 fixed transactions
    faker.seed(); // Reset the seed
    return transactions.sort((a, b) => b.date.getTime() - a.date.getTime()); // Sort by date desc
  }
} 