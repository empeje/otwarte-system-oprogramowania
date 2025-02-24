import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <Link 
        href="/data" 
        className="text-blue-500 hover:text-blue-600 underline"
      >
        View Sample Data
      </Link>
    </div>
  );
}
