export type CardType = 'visa' | 'mastercard';
export type CardColor = 'black' | 'white' | 'gold' | 'platinum' | 'rose-gold';

export interface Card {
  id: string;
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  cvv: string;
  balance: number;
  formattedBalance: string;
  type: CardType;
  color: CardColor;
  isActive: boolean;
  lastFourDigits: string;
  maskedNumber: string;
  currency: string;
} 