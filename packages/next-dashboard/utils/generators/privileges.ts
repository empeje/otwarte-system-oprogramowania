import { faker } from '@faker-js/faker';
import { format, addMonths } from 'date-fns';
import type { Privilege, PrivilegeLevel, PrivilegeCategory } from '@/types/privilege';

export class PrivilegeGenerator {
  private static readonly PRIVILEGE_LEVELS: PrivilegeLevel[] = ['bronze', 'silver', 'gold', 'platinum', 'diamond'];
  private static readonly PRIVILEGE_CATEGORIES: PrivilegeCategory[] = ['travel', 'shopping', 'dining', 'lifestyle', 'financial'];

  private static readonly PRIVILEGE_CONFIG = {
    travel: {
      names: ['Airport Lounge Access', 'Travel Insurance Premium', 'Hotel Elite Status'],
      benefits: ['Priority Check-in', 'Baggage Protection', 'Travel Concierge', 'Flight Upgrades']
    },
    shopping: {
      names: ['Shopping Rewards Plus', 'Exclusive Deals Access', 'Premium Cashback'],
      benefits: ['Extended Warranty', 'Purchase Protection', 'Early Sale Access', 'Free Shipping']
    },
    dining: {
      names: ['Dining Collection', 'Restaurant Premium', 'Gourmet Access'],
      benefits: ['Priority Reservations', 'Chef\'s Table Access', 'Special Menu Items', 'Dining Credits']
    },
    lifestyle: {
      names: ['Lifestyle Elite', 'Concierge Service', 'Entertainment Plus'],
      benefits: ['Event Access', '24/7 Concierge', 'Luxury Experiences', 'Member Events']
    },
    financial: {
      names: ['Financial Advisory', 'Wealth Management', 'Investment Priority'],
      benefits: ['Dedicated Advisor', 'Fee Waivers', 'Premium Rates', 'Investment Tools']
    }
  };

  static generatePrivilege(): Privilege {
    const level = faker.helpers.arrayElement(this.PRIVILEGE_LEVELS);
    const category = faker.helpers.arrayElement(this.PRIVILEGE_CATEGORIES);
    const config = this.PRIVILEGE_CONFIG[category];
    const name = faker.helpers.arrayElement(config.names);
    
    const points = faker.number.int({ min: 1000, max: 50000 });
    const requiredPoints = faker.number.int({ min: points, max: 100000 });
    
    return {
      id: faker.string.uuid(),
      name,
      level,
      category,
      description: faker.lorem.sentence(),
      points,
      requiredPoints,
      validUntil: addMonths(new Date(), 12),
      benefits: faker.helpers.arrayElements(config.benefits, { min: 2, max: 4 }),
      isActive: faker.datatype.boolean(0.9), // 90% chance of being active
      progress: (points / requiredPoints) * 100,
      formattedValidUntil: format(addMonths(new Date(), 12), 'MMM dd, yyyy')
    };
  }

  static generateFixedPrivileges(seed: number = 123): Privilege[] {
    faker.seed(seed);
    const privileges = Array.from({ length: 5 }, () => this.generatePrivilege());
    faker.seed();
    return privileges;
  }
} 