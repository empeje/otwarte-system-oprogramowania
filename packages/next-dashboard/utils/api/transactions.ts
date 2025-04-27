import { Transaction } from '@/types/transaction';
import { TransactionGenerator } from '@/utils/generators/transactions';
import { CardService } from './cards';

export class TransactionService {
  static async getTransactions(): Promise<Transaction[]> {
    const cards = await CardService.getCards();
    return cards.flatMap(card => 
      TransactionGenerator.generateFixedTransactions(card.id)
    );
  }

  static async getTransactionsByCardId(cardId: string): Promise<Transaction[]> {
    return TransactionGenerator.generateFixedTransactions(cardId);
  }

  static async getTransactionById(id: string): Promise<Transaction | null> {
    const transactions = await this.getTransactions();
    return transactions.find(transaction => transaction.id === id) || null;
  }
} 