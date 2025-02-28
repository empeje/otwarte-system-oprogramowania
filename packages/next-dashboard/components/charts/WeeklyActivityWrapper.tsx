'use client';

import dynamic from 'next/dynamic';
import {useEffect, useRef, useState} from "react";

const WeeklyActivity = dynamic(
  () => import('./WeeklyActivity').then(mod => mod.WeeklyActivity),
  {ssr: false}
);

interface WeeklyActivityWrapperProps {
  data: {
    week: string;
    deposits: number;
    withdrawals: number;
  }[];
}

export function WeeklyActivityWrapper({data}: WeeklyActivityWrapperProps) {
  const [size, setSize] = useState<number>();
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateSize = () => {
      if (divRef.current) {
        const newSize = divRef.current.clientWidth;
        setSize(newSize);
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div ref={divRef} className="min-h-[367px] w-full flex items-center justify-center">
      <WeeklyActivity
        data={data}
        width={size}
        height={367-28-28}
      />
    </div>
  );
} 