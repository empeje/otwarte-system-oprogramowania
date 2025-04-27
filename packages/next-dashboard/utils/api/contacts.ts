import { Contact } from '@/types/contact';
import { ContactGenerator } from '@/utils/generators/contacts';

export class ContactService {
  static async getContacts(): Promise<Contact[]> {
    return ContactGenerator.generateFixedContacts();
  }

  static async getContactById(id: string): Promise<Contact | null> {
    const contacts = await this.getContacts();
    return contacts.find(contact => contact.id === id) || null;
  }
} 