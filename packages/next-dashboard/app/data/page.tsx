import { CardService } from '@/utils/api/cards';
import { TransactionService } from '@/utils/api/transactions';
import { ActivityService } from '@/utils/api/activities';
import { ExpenseService } from '@/utils/api/expenses';
import { ContactService } from '@/utils/api/contacts';
import { BalanceService } from '@/utils/api/balance';

export default async function DataPage() {
  const [cards, transactions, activities, expenses, contacts, balanceHistory] = await Promise.all([
    CardService.getCards(),
    TransactionService.getTransactions(),
    ActivityService.getActivities(),
    ExpenseService.getExpenseBreakdown(),
    ContactService.getContacts(),
    BalanceService.getBalanceHistory()
  ]);
  
  return (
    <div className="min-h-screen p-8 space-y-6">
      <details className="group" open>
        <summary className="text-2xl font-bold mb-4 cursor-pointer list-none">
          Cards Data
          <span className="text-sm ml-2 text-gray-500">
            ({cards.length} items)
          </span>
        </summary>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-auto">
          {JSON.stringify(cards, null, 2)}
        </pre>
      </details>
      
      <details className="group" open>
        <summary className="text-2xl font-bold mb-4 cursor-pointer list-none">
          Transactions Data
          <span className="text-sm ml-2 text-gray-500">
            ({transactions.length} items)
          </span>
        </summary>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-auto">
          {JSON.stringify(transactions, null, 2)}
        </pre>
      </details>

      <details className="group" open>
        <summary className="text-2xl font-bold mb-4 cursor-pointer list-none">
          Activities Data
          <span className="text-sm ml-2 text-gray-500">
            ({activities.length} items)
          </span>
        </summary>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-auto">
          {JSON.stringify(activities, null, 2)}
        </pre>
      </details>

      <details className="group" open>
        <summary className="text-2xl font-bold mb-4 cursor-pointer list-none">
          Expense Breakdown
          <span className="text-sm ml-2 text-gray-500">
            ({expenses.categories.length} categories)
          </span>
        </summary>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-auto">
          {JSON.stringify(expenses, null, 2)}
        </pre>
      </details>

      <details className="group" open>
        <summary className="text-2xl font-bold mb-4 cursor-pointer list-none">
          Contacts Data
          <span className="text-sm ml-2 text-gray-500">
            ({contacts.length} items)
          </span>
        </summary>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-auto">
          {JSON.stringify(contacts, null, 2)}
        </pre>
      </details>

      <details className="group" open>
        <summary className="text-2xl font-bold mb-4 cursor-pointer list-none">
          Balance History
          <span className="text-sm ml-2 text-gray-500">
            ({balanceHistory.history.length} days)
          </span>
        </summary>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-auto">
          {JSON.stringify(balanceHistory, null, 2)}
        </pre>
      </details>
    </div>
  );
} 