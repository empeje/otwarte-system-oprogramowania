import { CardService } from '@/utils/api/cards';

export default async function Home() {
  // Since this is a server component, we can directly await
  const cards = await CardService.getCards();
  
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">Cards Data</h1>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-auto">
        {JSON.stringify(cards, null, 2)}
      </pre>
    </div>
  );
}
