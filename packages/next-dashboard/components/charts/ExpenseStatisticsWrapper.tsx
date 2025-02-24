'use client';

import dynamic from 'next/dynamic';

const ExpenseStatistics = dynamic(
  () => import('./ExpenseStatistics').then(mod => mod.ExpenseStatistics),
  { ssr: false }
);

interface ExpenseStatisticsWrapperProps {
  data: {
    category: string;
    percentage: number;
    color: string;
  }[];
}

export function ExpenseStatisticsWrapper({ data }: ExpenseStatisticsWrapperProps) {
  return (
    <div className="h-[400px] w-full">
      <ExpenseStatistics 
        data={data}
        width={400}
        height={400}
      />
    </div>
  );
} 