export type NotificationType = 'email' | 'sms' | 'push';
export type ThemeMode = 'light' | 'dark' | 'system';
export type Language = 'en' | 'es' | 'fr' | 'de' | 'zh';
export type Currency = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CNY';

export interface UserSettings {
  id: string;
  notifications: {
    type: NotificationType;
    enabled: boolean;
    categories: string[];
  }[];
  theme: ThemeMode;
  language: Language;
  currency: Currency;
  timeZone: string;
  twoFactorEnabled: boolean;
  emailVerified: boolean;
  phoneVerified: boolean;
  lastUpdated: Date;
  formattedLastUpdated: string;
} 