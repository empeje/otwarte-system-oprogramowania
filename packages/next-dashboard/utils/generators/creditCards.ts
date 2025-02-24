import { faker } from '@faker-js/faker';
import { format, addMonths } from 'date-fns';
import type { CreditCard, CreditCardNetwork, CreditCardStatus, CreditCardTier } from '@/types/creditCard';

export class CreditCardGenerator {
  private static readonly CARD_NETWORKS: CreditCardNetwork[] = ['visa', 'mastercard', 'amex', 'discover'];
  private static readonly CARD_STATUS: CreditCardStatus[] = ['active', 'inactive', 'expired', 'blocked'];
  private static readonly CARD_TIERS: CreditCardTier[] = ['standard', 'gold', 'platinum', 'infinite'];

  static generateCreditCard(): CreditCard {
    const cardNumber = faker.finance.creditCardNumber();
    const firstFourDigits = cardNumber.slice(0, 4);
    const lastFourDigits = cardNumber.slice(-4);
    const creditLimit = parseFloat(faker.finance.amount(5000, 50000, 2));
    const currentBalance = parseFloat(faker.finance.amount(0, creditLimit, 2));
    const dueDate = addMonths(new Date(), 1);
    
    return {
      id: faker.string.uuid(),
      cardNumber,
      cardholderName: faker.person.fullName(),
      expiryDate: faker.date.future({ years: 4 }).toLocaleDateString('en-US', {
        month: '2-digit',
        year: '2-digit'
      }),
      cvv: faker.finance.creditCardCVV(),
      network: faker.helpers.arrayElement(this.CARD_NETWORKS),
      tier: faker.helpers.arrayElement(this.CARD_TIERS),
      creditLimit,
      currentBalance,
      availableCredit: creditLimit - currentBalance,
      dueDate,
      minimumPayment: currentBalance * 0.02, // 2% of current balance
      apr: parseFloat(faker.finance.amount(12, 24, 2)),
      status: faker.helpers.arrayElement(this.CARD_STATUS),
      isDefault: false,
      formattedCreditLimit: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(creditLimit),
      formattedCurrentBalance: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(currentBalance),
      formattedAvailableCredit: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(creditLimit - currentBalance),
      formattedMinimumPayment: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(currentBalance * 0.02),
      formattedDueDate: format(dueDate, 'MMM dd, yyyy'),
      lastFourDigits,
      maskedNumber: `${firstFourDigits} •••• •••• ${lastFourDigits}`
    };
  }

  static generateFixedCreditCards(seed: number = 123): CreditCard[] {
    faker.seed(seed);
    const cards = Array.from({ length: 3 }, () => this.generateCreditCard());
    cards[0].isDefault = true; // Make first card default
    faker.seed();
    return cards;
  }
} 