import { CreditCard } from '@/types/creditCard';
import { CreditCardGenerator } from '@/utils/generators/creditCards';

export class CreditCardService {
  static async getCreditCards(): Promise<CreditCard[]> {
    return CreditCardGenerator.generateFixedCreditCards();
  }

  static async getCreditCardById(id: string): Promise<CreditCard | null> {
    const creditCards = await this.getCreditCards();
    return creditCards.find(card => card.id === id) || null;
  }
} 