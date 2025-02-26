import { faker } from '@faker-js/faker';
import { format } from 'date-fns';
import type { Contact, ContactStatus, ContactType } from '@/types/contact';

export class ContactGenerator {
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

  static generateContact(): Contact {
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
      name,
      email,
      phone: faker.phone.number(),
      type,
      status: faker.helpers.arrayElement(this.CONTACT_STATUS),
      accountNumber: faker.finance.accountNumber(10),
      bankName: faker.helpers.arrayElement(this.BANK_NAMES),
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
      createdAt: faker.date.past({ years: 1 }),
      formattedDate: format(faker.date.past({ years: 1 }), 'MMM dd, yyyy'),
      recentTransactions: faker.number.int({ min: 0, max: 15 }),
      totalTransferred,
      formattedTotal: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(totalTransferred)
    };
  }

  static generateContacts(count: number): Contact[] {
    return Array.from({ length: count }, () => this.generateContact());
  }

  static generateFixedContacts(seed: number = 123): Contact[] {
    faker.seed(seed);
    const contacts = this.generateContacts(8); // Generate 8 fixed contacts
    faker.seed(); // Reset the seed
    return contacts.sort((a, b) => b.totalTransferred - a.totalTransferred);
  }
} 