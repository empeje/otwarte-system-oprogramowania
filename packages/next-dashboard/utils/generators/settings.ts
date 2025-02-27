import { faker } from '@faker-js/faker';
import { format } from 'date-fns';
import type { UserSettings, NotificationType, ThemeMode, Language, Currency } from '@/types/setting';
import type {ContactStatus, ContactType} from "@/types/contact";

export class SettingsGenerator {
  private static readonly NOTIFICATION_TYPES: NotificationType[] = ['email', 'sms', 'push'];
  private static readonly THEME_MODES: ThemeMode[] = ['light', 'dark', 'system'];
  private static readonly LANGUAGES: Language[] = ['en', 'es', 'fr', 'de', 'zh'];
  private static readonly CURRENCIES: Currency[] = ['USD', 'EUR', 'GBP', 'JPY', 'CNY'];
  private static readonly NOTIFICATION_CATEGORIES = [
    'transactions',
    'security',
    'promotions',
    'account',
    'bills',
    'investments'
  ];
  private static readonly CONTACT_STATUS: ContactStatus[] = ['active', 'inactive', 'pending'];
  private static readonly CONTACT_TYPES: ContactType[] = ['personal', 'business'];
  private static readonly BANK_NAMES = [
    'Chase Bank',
    'Bank of America',
    'Wells Fargo',
    'Citibank',
    'Capital One',
    'Goldman Sachs',
    'US Bank',
    'TD Bank'
  ];

  static generateSettings(): UserSettings {
    const lastUpdated = faker.date.recent();
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const name = `${firstName} ${lastName}`;
    const type = faker.helpers.arrayElement(this.CONTACT_TYPES);
    const email = type === 'business'
      ? faker.internet.email({ firstName, lastName, provider: faker.helpers.arrayElement(['company.com', 'corp.net', 'business.org']) })
      : faker.internet.email({ firstName, lastName });

    const totalTransferred = parseFloat(faker.finance.amount({min: 500, max: 25000, dec: 2}));

    return {
      id: faker.string.uuid(),
      notifications: this.NOTIFICATION_TYPES.map(type => ({
        type,
        enabled: faker.datatype.boolean(0.7), // 70% chance of being enabled
        categories: faker.helpers.arrayElements(
          this.NOTIFICATION_CATEGORIES,
          { min: 2, max: 5 }
        )
      })),
      theme: faker.helpers.arrayElement(this.THEME_MODES),
      language: faker.helpers.arrayElement(this.LANGUAGES),
      currency: faker.helpers.arrayElement(this.CURRENCIES),
      timeZone: faker.location.timeZone(),
      twoFactorEnabled: faker.datatype.boolean(0.6), // 60% chance of being enabled
      emailVerified: faker.datatype.boolean(0.9), // 90% chance of being verified
      phoneVerified: faker.datatype.boolean(0.8), // 80% chance of being verified
      lastUpdated,
      formattedLastUpdated: format(lastUpdated, 'MMM dd, yyyy HH:mm:ss'),
      profile: {
        id: faker.string.uuid(),
        name,
        email,
        phone: faker.phone.number(),
        type,
        status: faker.helpers.arrayElement(this.CONTACT_STATUS),
        accountNumber: faker.finance.accountNumber(10),
        bankName: faker.helpers.arrayElement(this.BANK_NAMES),
        avatar: `https://api.dicebear.com/9.x/avataaars-neutral/jpeg?seed=${encodeURIComponent(name)}`,
        createdAt: faker.date.past({ years: 1 }),
        formattedDate: format(faker.date.past({ years: 1 }), 'MMM dd, yyyy'),
        recentTransactions: faker.number.int({ min: 0, max: 15 }),
        totalTransferred,
        formattedTotal: new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(totalTransferred)
      }
    };
  }

  static generateFixedSettings(seed: number = 123): UserSettings {
    faker.seed(seed);
    const settings = this.generateSettings();
    faker.seed();
    return settings;
  }
} 