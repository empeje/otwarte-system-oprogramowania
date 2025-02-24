import { CardService } from '@/utils/api/cards';
import { TransactionService } from '@/utils/api/transactions';

export default async function DataPage() {
  const [cards, transactions] = await Promise.all([
    CardService.getCards(),
    TransactionService.getTransactions()
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
    </div>
  );
} 