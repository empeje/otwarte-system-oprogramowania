'use client';

import dynamic from 'next/dynamic';
import {useEffect, useRef, useState} from "react";

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
  const [size, setSize] = useState(0);
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
    <div ref={divRef} className="h-[276px] w-full">
      <BalanceHistory 
        data={data}
        width={size}
        height={276}
      />
    </div>
  );
} 