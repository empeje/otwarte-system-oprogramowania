export type InvestmentType = 'stock' | 'crypto' | 'etf' | 'mutual_fund' | 'bond';
export type InvestmentStatus = 'active' | 'pending' | 'sold';

export interface Investment {
  id: string;
  name: string;
  symbol: string;
  type: InvestmentType;
  status: InvestmentStatus;
  quantity: number;
  purchasePrice: number;
  currentPrice: number;
  totalValue: number;
  profitLoss: number;
  profitLossPercentage: number;
  formattedPurchasePrice: string;
  formattedCurrentPrice: string;
  formattedTotalValue: string;
  formattedProfitLoss: string;
  lastUpdated: Date;
  formattedLastUpdated: string;
} 