import { faker } from '@faker-js/faker';
import { format } from 'date-fns';
import type { Investment, InvestmentType, InvestmentStatus } from '@/types/investment';

export class InvestmentGenerator {
  private static readonly INVESTMENT_TYPES: InvestmentType[] = ['stock', 'crypto', 'etf', 'mutual_fund', 'bond'];
  private static readonly INVESTMENT_STATUS: InvestmentStatus[] = ['active', 'pending', 'sold'];
  
  private static readonly STOCKS = [
    { name: 'Apple Inc.', symbol: 'AAPL' },
    { name: 'Microsoft Corporation', symbol: 'MSFT' },
    { name: 'Amazon.com Inc.', symbol: 'AMZN' },
    { name: 'Alphabet Inc.', symbol: 'GOOGL' }
  ];
  
  private static readonly CRYPTO = [
    { name: 'Bitcoin', symbol: 'BTC' },
    { name: 'Ethereum', symbol: 'ETH' },
    { name: 'Cardano', symbol: 'ADA' },
    { name: 'Solana', symbol: 'SOL' }
  ];

  static generateInvestment(): Investment {
    const type = faker.helpers.arrayElement(this.INVESTMENT_TYPES);
    const asset = type === 'crypto' 
      ? faker.helpers.arrayElement(this.CRYPTO)
      : type === 'stock' 
        ? faker.helpers.arrayElement(this.STOCKS)
        : { 
            name: `${faker.company.name()} ${type.toUpperCase()}`, 
            symbol: faker.finance.currencyCode() 
          };

    const purchasePrice = parseFloat(faker.finance.amount(10, 1000, 2));
    const priceChange = parseFloat(faker.finance.amount(-200, 300, 2));
    const currentPrice = purchasePrice + priceChange;
    const quantity = parseFloat(faker.finance.amount(1, 100, 2));
    
    const totalValue = currentPrice * quantity;
    const profitLoss = (currentPrice - purchasePrice) * quantity;
    const profitLossPercentage = (profitLoss / (purchasePrice * quantity)) * 100;

    return {
      id: faker.string.uuid(),
      name: asset.name,
      symbol: asset.symbol,
      type,
      status: faker.helpers.arrayElement(this.INVESTMENT_STATUS),
      quantity,
      purchasePrice,
      currentPrice,
      totalValue,
      profitLoss,
      profitLossPercentage,
      formattedPurchasePrice: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(purchasePrice),
      formattedCurrentPrice: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(currentPrice),
      formattedTotalValue: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(totalValue),
      formattedProfitLoss: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        signDisplay: 'always'
      }).format(profitLoss),
      lastUpdated: new Date(),
      formattedLastUpdated: format(new Date(), 'MMM dd, yyyy HH:mm:ss')
    };
  }

  static generateFixedInvestments(seed: number = 123): Investment[] {
    faker.seed(seed);
    const investments = Array.from({ length: 6 }, () => this.generateInvestment());
    faker.seed();
    return investments;
  }
} 