import { faker } from '@faker-js/faker';
import { format, addMonths } from 'date-fns';
import type { Loan, LoanType, LoanStatus } from '@/types/loan';

export class LoanGenerator {
  private static readonly LOAN_TYPES: LoanType[] = ['personal', 'mortgage', 'auto', 'student', 'business'];
  private static readonly LOAN_STATUS: LoanStatus[] = ['active', 'paid', 'defaulted', 'pending'];

  static generateLoan(): Loan {
    const type = faker.helpers.arrayElement(this.LOAN_TYPES);
    const amount = parseFloat(faker.finance.amount(
      {
        min: (type === 'mortgage' ? 100000 : 5000),
        max: (type === 'mortgage' ? 1000000 : 50000),
        dec: 2
      }
    ));
    const term = type === 'mortgage' ? 360 : 60; // 30 years for mortgage, 5 years for others
    const interestRate = parseFloat(faker.finance.amount({min: 3, max: 12, dec: 2}));
    const monthlyRate = interestRate / 1200; // Convert annual rate to monthly decimal
    const monthlyPayment = (amount * monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1);
    
    const startDate = faker.date.past({ years: 2 });
    const monthsPassed = Math.floor((new Date().getTime() - startDate.getTime()) / (30 * 24 * 60 * 60 * 1000));
    const remainingBalance = amount * Math.pow(1 + monthlyRate, monthsPassed) - monthlyPayment * (Math.pow(1 + monthlyRate, monthsPassed) - 1) / monthlyRate;
    
    return {
      id: faker.string.uuid(),
      type,
      status: faker.helpers.arrayElement(this.LOAN_STATUS),
      amount,
      remainingBalance: Math.max(0, remainingBalance),
      interestRate,
      term,
      monthlyPayment,
      startDate,
      nextPaymentDate: addMonths(new Date(), 1),
      formattedAmount: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(amount),
      formattedRemainingBalance: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(Math.max(0, remainingBalance)),
      formattedMonthlyPayment: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(monthlyPayment),
      formattedStartDate: format(startDate, 'MMM dd, yyyy'),
      formattedNextPaymentDate: format(addMonths(new Date(), 1), 'MMM dd, yyyy'),
      progress: ((amount - Math.max(0, remainingBalance)) / amount) * 100
    };
  }

  static generateFixedLoans(seed: number = 123): Loan[] {
    faker.seed(seed);
    const loans = Array.from({ length: 3 }, () => this.generateLoan());
    faker.seed();
    return loans;
  }
} 