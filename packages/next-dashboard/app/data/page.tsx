import { CardService } from '@/utils/api/cards';
import { TransactionService } from '@/utils/api/transactions';
import { ActivityService } from '@/utils/api/activities';
import { ExpenseService } from '@/utils/api/expenses';
import { ContactService } from '@/utils/api/contacts';
import { BalanceService } from '@/utils/api/balance';
import { AccountService } from '@/utils/api/accounts';
import { InvestmentService } from '@/utils/api/investments';
import { CreditCardService } from '@/utils/api/creditCards';
import { LoanService } from '@/utils/api/loans';
import { ServiceService } from '@/utils/api/services';
import { PrivilegeService } from '@/utils/api/privileges';
import { SettingsService } from '@/utils/api/settings';

export default async function DataPage() {
  const [
    cards, 
    transactions, 
    activities, 
    expenses, 
    contacts, 
    balanceHistory,
    accounts,
    investments,
    creditCards,
    loans,
    services,
    privileges,
    settings
  ] = await Promise.all([
    CardService.getCards(),
    TransactionService.getTransactions(),
    ActivityService.getActivities(),
    ExpenseService.getExpenseBreakdown(),
    ContactService.getContacts(),
    BalanceService.getBalanceHistory(),
    AccountService.getAccounts(),
    InvestmentService.getInvestments(),
    CreditCardService.getCreditCards(),
    LoanService.getLoans(),
    ServiceService.getServices(),
    PrivilegeService.getPrivileges(),
    SettingsService.getSettings()
  ]);

  return (
    <div className="min-h-screen p-8 space-y-6">
      <details className="group">
        <summary className="text-2xl font-bold mb-4 cursor-pointer list-none">
          Cards
          <span className="text-sm ml-2 text-gray-500">
            ({cards.length} items)
          </span>
        </summary>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-auto">
          {JSON.stringify(cards, null, 2)}
        </pre>
      </details>

      <details className="group">
        <summary className="text-2xl font-bold mb-4 cursor-pointer list-none">
          Transactions
          <span className="text-sm ml-2 text-gray-500">
            ({transactions.length} items)
          </span>
        </summary>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-auto">
          {JSON.stringify(transactions, null, 2)}
        </pre>
      </details>

      <details className="group">
        <summary className="text-2xl font-bold mb-4 cursor-pointer list-none">
          Activities
          <span className="text-sm ml-2 text-gray-500">
            ({activities.length} items)
          </span>
        </summary>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-auto">
          {JSON.stringify(activities, null, 2)}
        </pre>
      </details>

      <details className="group">
        <summary className="text-2xl font-bold mb-4 cursor-pointer list-none">
          Expenses
        </summary>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-auto">
          {JSON.stringify(expenses, null, 2)}
        </pre>
      </details>

      <details className="group">
        <summary className="text-2xl font-bold mb-4 cursor-pointer list-none">
          Contacts
          <span className="text-sm ml-2 text-gray-500">
            ({contacts.length} items)
          </span>
        </summary>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-auto">
          {JSON.stringify(contacts, null, 2)}
        </pre>
      </details>

      <details className="group">
        <summary className="text-2xl font-bold mb-4 cursor-pointer list-none">
          Balance History
        </summary>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-auto">
          {JSON.stringify(balanceHistory, null, 2)}
        </pre>
      </details>

      <details className="group">
        <summary className="text-2xl font-bold mb-4 cursor-pointer list-none">
          Bank Accounts
          <span className="text-sm ml-2 text-gray-500">
            ({accounts.length} items)
          </span>
        </summary>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-auto">
          {JSON.stringify(accounts, null, 2)}
        </pre>
      </details>

      <details className="group">
        <summary className="text-2xl font-bold mb-4 cursor-pointer list-none">
          Investments
          <span className="text-sm ml-2 text-gray-500">
            ({investments.length} items)
          </span>
        </summary>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-auto">
          {JSON.stringify(investments, null, 2)}
        </pre>
      </details>

      <details className="group">
        <summary className="text-2xl font-bold mb-4 cursor-pointer list-none">
          Credit Cards
          <span className="text-sm ml-2 text-gray-500">
            ({creditCards.length} items)
          </span>
        </summary>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-auto">
          {JSON.stringify(creditCards, null, 2)}
        </pre>
      </details>

      <details className="group">
        <summary className="text-2xl font-bold mb-4 cursor-pointer list-none">
          Loans
          <span className="text-sm ml-2 text-gray-500">
            ({loans.length} items)
          </span>
        </summary>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-auto">
          {JSON.stringify(loans, null, 2)}
        </pre>
      </details>

      <details className="group">
        <summary className="text-2xl font-bold mb-4 cursor-pointer list-none">
          Services
          <span className="text-sm ml-2 text-gray-500">
            ({services.length} items)
          </span>
        </summary>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-auto">
          {JSON.stringify(services, null, 2)}
        </pre>
      </details>

      <details className="group">
        <summary className="text-2xl font-bold mb-4 cursor-pointer list-none">
          Privileges
          <span className="text-sm ml-2 text-gray-500">
            ({privileges.length} items)
          </span>
        </summary>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-auto">
          {JSON.stringify(privileges, null, 2)}
        </pre>
      </details>

      <details className="group">
        <summary className="text-2xl font-bold mb-4 cursor-pointer list-none">
          Settings
        </summary>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-auto">
          {JSON.stringify(settings, null, 2)}
        </pre>
      </details>
    </div>
  );
} 