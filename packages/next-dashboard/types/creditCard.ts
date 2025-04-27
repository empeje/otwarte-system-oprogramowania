export type CreditCardStatus = 'active' | 'inactive' | 'expired' | 'blocked';
export type CreditCardNetwork = 'visa' | 'mastercard' | 'amex' | 'discover';
export type CreditCardTier = 'standard' | 'gold' | 'platinum' | 'infinite';

export interface CreditCard {
  id: string;
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  cvv: string;
  network: CreditCardNetwork;
  tier: CreditCardTier;
  creditLimit: number;
  currentBalance: number;
  availableCredit: number;
  dueDate: Date;
  minimumPayment: number;
  apr: number;
  status: CreditCardStatus;
  isDefault: boolean;
  formattedCreditLimit: string;
  formattedCurrentBalance: string;
  formattedAvailableCredit: string;
  formattedMinimumPayment: string;
  formattedDueDate: string;
  lastFourDigits: string;
  maskedNumber: string;
} 