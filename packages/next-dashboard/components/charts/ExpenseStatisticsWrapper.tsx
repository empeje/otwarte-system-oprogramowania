'use client';

import dynamic from 'next/dynamic';
import React, {useEffect, useRef, useState} from "react";

const ExpenseStatistics = dynamic(
  () => import('./ExpenseStatistics').then(mod => mod.ExpenseStatistics),
  {ssr: false}
);

interface ExpenseStatisticsWrapperProps {
  data: {
    category: string;
    percentage: number;
    color: string;
  }[];
}

export function ExpenseStatisticsWrapper({data}: ExpenseStatisticsWrapperProps) {
  const [size, setSize] = useState(400);
  const divRef = useRef(null);


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
      <ExpenseStatistics
        data={data}
        width={size}
        height={size}
      />
    </div>
  );
} 