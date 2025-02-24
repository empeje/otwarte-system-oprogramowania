'use client';

import dynamic from 'next/dynamic';

const WeeklyActivity = dynamic(
  () => import('./WeeklyActivity').then(mod => mod.WeeklyActivity),
  { ssr: false }
);

interface WeeklyActivityWrapperProps {
  data: {
    week: string;
    deposits: number;
    withdrawals: number;
  }[];
}

export function WeeklyActivityWrapper({ data }: WeeklyActivityWrapperProps) {
  return (
    <div className="h-[400px] w-full">
      <WeeklyActivity 
        data={data}
        width={800}
        height={400}
      />
    </div>
  );
} 