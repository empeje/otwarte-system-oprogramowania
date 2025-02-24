'use client';

import dynamic from 'next/dynamic';

const BalanceHistory = dynamic(
  () => import('./BalanceHistory').then(mod => mod.BalanceHistory),
  { ssr: false }
);

interface BalanceHistoryWrapperProps {
  data: {
    date: Date;
    balance: number;
  }[];
}

export function BalanceHistoryWrapper({ data }: BalanceHistoryWrapperProps) {
  return (
    <div className="h-[400px] w-full">
      <BalanceHistory 
        data={data}
        width={800}
        height={400}
      />
    </div>
  );
} 