import { faker } from '@faker-js/faker';
import type { Card, CardType, CardColor } from '@/types/card';

export class CardGenerator {
  private static readonly CARD_TYPES: CardType[] = ['visa', 'mastercard'];
  private static readonly CARD_COLORS: CardColor[] = ['black', 'white', 'gold', 'platinum', 'rose-gold'];

  static generateCard(): Card {
    const cardNumber = faker.finance.creditCardNumber();
    const firstFourDigits = cardNumber.slice(0, 4);
    const lastFourDigits = cardNumber.slice(-4);
    const balance = parseFloat(faker.finance.amount({min: 1000, max: 50000, dec: 2}));
    
    return {
      id: faker.string.uuid(),
      cardNumber,
      cardholderName: faker.person.fullName(),
      expiryDate: faker.date.future({ years: 4 }).toLocaleDateString('en-US', {
        month: '2-digit',
        year: '2-digit'
      }),
      cvv: faker.finance.creditCardCVV(),
      balance,
      formattedBalance: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(balance),
      type: faker.helpers.arrayElement(this.CARD_TYPES),
      color: faker.helpers.arrayElement(this.CARD_COLORS),
      isActive: faker.datatype.boolean(0.9), // 90% chance of being active
      lastFourDigits,
      maskedNumber: `${firstFourDigits} •••• •••• ${lastFourDigits}`,
      currency: 'USD'
    };
  }

  static generateCards(count: number): Card[] {
    return Array.from({ length: count }, () => this.generateCard());
  }

  // Generate a fixed set of credit-cards for consistent data across refreshes
  static generateFixedCards(seed: number = 123): Card[] {
    faker.seed(seed);
    const cards = this.generateCards(4); // Generate 4 fixed credit-cards
    faker.seed(); // Reset the seed
    return cards;
  }
} 