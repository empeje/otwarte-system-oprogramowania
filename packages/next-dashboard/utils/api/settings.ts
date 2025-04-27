import { UserSettings } from '@/types/setting';
import { SettingsGenerator } from '@/utils/generators/settings';

export class SettingsService {
  static async getSettings(): Promise<UserSettings> {
    return SettingsGenerator.generateFixedSettings();
  }
} 