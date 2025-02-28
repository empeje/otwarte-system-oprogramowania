'use client';

import {Group} from '@visx/group';
import {Text} from '@visx/text';
import {Pie} from '@visx/shape';
import {useState} from "react";

interface ExpenseStatisticsProps {
  data: {
    category: string;
    percentage: number;
    color: string;
  }[];
  width?: number;
  height?: number;
}

type Arc = { startAngle: number; endAngle: number };

type PathFunction = {
  (arc: Arc): string; // Function signature (callable)
  centroid: (arc: Arc) => [number, number]; // Additional field
};

export function ExpenseStatistics(
  {
    data,
    width = 400,
    height = 400
  }: ExpenseStatisticsProps) {
  const radius = Math.min(width, height) / 2;
  const centerY = height / 2;
  const centerX = width / 2;

  const Content = ({pie, arc, i}: {
    pie: { path: PathFunction };
    arc: Arc;
    i: number;
  }) => {
    const [centroidX, centroidY] = pie.path.centroid(arc);
    const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.1;
    const [isHovered, setHovered] = useState(false);

    const midAngle = (arc.startAngle + arc.endAngle) / 2;

    const explodeOffset = isHovered ? 15 : 0;

    const dx = Math.cos(midAngle - Math.PI / 2) * explodeOffset;
    const dy = Math.sin(midAngle - Math.PI / 2) * explodeOffset;

    return (
      <g key={`arc-${i}`}
         transform={`translate(${dx}, ${dy})`}
         onMouseEnter={() => setHovered(true)}
         onMouseLeave={() => setHovered(false)}>
        <path
          d={pie.path(arc) || ''}
          fill={data[i].color}
        />
        {hasSpaceForLabel && (
          <g>
            <Text
              x={centroidX}
              y={centroidY - 0}
              fill="white"
              fontSize={16}
              fontWeight="bold"
              textAnchor="middle"
            >
              {`${data[i].percentage}%`}
            </Text>
            <Text
              x={centroidX}
              y={centroidY + 15}
              fill="white"
              fontSize={13}
              fontWeight="bold"
              textAnchor="middle"
            >
              {data[i].category}
            </Text>
          </g>
        )}
      </g>
    );
  };

  return (
    <svg width={width} height={height}>
      <Group top={centerY} left={centerX}>
        <Pie
          data={data}
          pieValue={d => d.percentage}
          outerRadius={radius - 20}
          innerRadius={radius * 0.03}
          padAngle={0.04}
        >
          {pie => {
            return pie.arcs.map((arc, i) => <Content pie={pie} arc={arc} i={i} key={i}/>);
          }}
        </Pie>
      </Group>
    </svg>
  );
} 