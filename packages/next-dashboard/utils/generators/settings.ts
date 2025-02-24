import { faker } from '@faker-js/faker';
import { format } from 'date-fns';
import type { UserSettings, NotificationType, ThemeMode, Language, Currency } from '@/types/setting';

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

  static generateSettings(): UserSettings {
    const lastUpdated = faker.date.recent();
    
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
      formattedLastUpdated: format(lastUpdated, 'MMM dd, yyyy HH:mm:ss')
    };
  }

  static generateFixedSettings(seed: number = 123): UserSettings {
    faker.seed(seed);
    const settings = this.generateSettings();
    faker.seed();
    return settings;
  }
} 