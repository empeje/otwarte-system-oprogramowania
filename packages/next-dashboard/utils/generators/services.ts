import { faker } from '@faker-js/faker';
import { format } from 'date-fns';
import type { Service, ServiceCategory, ServiceStatus } from '@/types/service';

export class ServiceGenerator {
  private static readonly SERVICE_CATEGORIES: ServiceCategory[] = ['insurance', 'investment', 'banking', 'credit', 'advisory'];
  private static readonly SERVICE_STATUS: ServiceStatus[] = ['active', 'inactive', 'pending'];

  private static readonly SERVICE_CONFIG = {
    insurance: {
      names: ['Life Insurance Plus', 'Health Shield Pro', 'Property Guard Elite'],
      features: ['24/7 Support', 'No Hidden Fees', 'Instant Claims', 'Family Coverage']
    },
    investment: {
      names: ['Wealth Management Pro', 'Retirement Planning Plus', 'Portfolio Optimizer'],
      features: ['Professional Advice', 'Market Analysis', 'Portfolio Rebalancing', 'Tax Optimization']
    },
    banking: {
      names: ['Premium Banking', 'Digital Banking Plus', 'Business Banking Pro'],
      features: ['Zero Fees', 'Premium Support', 'Global Access', 'Special Rates']
    },
    credit: {
      names: ['Credit Shield', 'Score Booster Pro', 'Credit Monitoring Plus'],
      features: ['Real-time Alerts', 'Identity Protection', 'Credit Reports', 'Score Tracking']
    },
    advisory: {
      names: ['Financial Advisory Pro', 'Tax Planning Plus', 'Estate Planning Elite'],
      features: ['Personal Advisor', 'Custom Strategy', 'Regular Reviews', 'Expert Consultation']
    }
  };

  static generateService(): Service {
    const category = faker.helpers.arrayElement(this.SERVICE_CATEGORIES);
    const config = this.SERVICE_CONFIG[category];
    const name = faker.helpers.arrayElement(config.names);
    const monthlyFee = parseFloat(faker.finance.amount({min: 9.99, max: 99.99, dec: 2}));
    const enrollmentDate = faker.date.past({ years: 1 });
    
    return {
      id: faker.string.uuid(),
      name,
      category,
      status: faker.helpers.arrayElement(this.SERVICE_STATUS),
      description: faker.lorem.sentence(),
      monthlyFee,
      billingDate: faker.date.future({ years: 1 }),
      enrollmentDate,
      features: faker.helpers.arrayElements(config.features, { min: 2, max: 4 }),
      formattedMonthlyFee: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(monthlyFee),
      formattedBillingDate: format(faker.date.future({ years: 1 }), 'MMM dd, yyyy'),
      formattedEnrollmentDate: format(enrollmentDate, 'MMM dd, yyyy'),
      isAutoRenew: faker.datatype.boolean(0.8) // 80% chance of auto-renewal
    };
  }

  static generateFixedServices(seed: number = 123): Service[] {
    faker.seed(seed);
    const services = Array.from({ length: 4 }, () => this.generateService());
    faker.seed();
    return services;
  }
} 