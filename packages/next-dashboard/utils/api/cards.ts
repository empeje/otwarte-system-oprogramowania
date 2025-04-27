import { Card } from '@/types/card';
import { CardGenerator } from '@/utils/generators/cards';

export class CardService {
  static async getCards(): Promise<Card[]> {
    return CardGenerator.generateFixedCards();
  }

  static async getCardById(id: string): Promise<Card | null> {
    const cards = await this.getCards();
    return cards.find(card => card.id === id) || null;
  }
} 