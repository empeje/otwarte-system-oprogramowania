import { Privilege } from '@/types/privilege';
import { PrivilegeGenerator } from '@/utils/generators/privileges';

export class PrivilegeService {
  static async getPrivileges(): Promise<Privilege[]> {
    return PrivilegeGenerator.generateFixedPrivileges();
  }

  static async getPrivilegeById(id: string): Promise<Privilege | null> {
    const privileges = await this.getPrivileges();
    return privileges.find(privilege => privilege.id === id) || null;
  }
} 