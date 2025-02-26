import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="space-y-4">
        <div>
          <Link 
            href="/dashboard-x"
            className="text-blue-500 hover:text-blue-600 underline block"
          >
            View Dashboard
          </Link>
        </div>
        <div>
          <Link 
            href="/data" 
            className="text-blue-500 hover:text-blue-600 underline block"
          >
            View Sample Data
          </Link>
        </div>
      </div>
    </div>
  );
}
