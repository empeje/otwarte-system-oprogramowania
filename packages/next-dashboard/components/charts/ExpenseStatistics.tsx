'use client';

import { Group } from '@visx/group';
import { Text } from '@visx/text';
import { Pie } from '@visx/shape';

interface ExpenseStatisticsProps {
  data: {
    category: string;
    percentage: number;
    color: string;
  }[];
  width?: number;
  height?: number;
}

export function ExpenseStatistics({
  data,
  width = 400,
  height = 400
}: ExpenseStatisticsProps) {
  const radius = Math.min(width, height) / 2;
  const centerY = height / 2;
  const centerX = width / 2;

  return (
    <svg width={width} height={height}>
      <Group top={centerY} left={centerX}>
        <Pie
          data={data}
          pieValue={d => d.percentage}
          outerRadius={radius - 20}
          innerRadius={0}
          padAngle={0.02}
        >
          {pie => {
            return pie.arcs.map((arc, i) => {
              // Calculate the centroid properly
              const [centroidX, centroidY] = pie.path.centroid(arc);
              const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.1;
              
              return (
                <g key={`arc-${i}`}>
                  <path
                    d={pie.path(arc) || ''}
                    fill={data[i].color}
                  />
                  {hasSpaceForLabel && (
                    <g>
                      <Text
                        x={centroidX}
                        y={centroidY - 15}
                        fill="white"
                        fontSize={16}
                        textAnchor="middle"
                        fontWeight="bold"
                      >
                        {`${data[i].percentage}%`}
                      </Text>
                      <Text
                        x={centroidX}
                        y={centroidY + 15}
                        fill="white"
                        fontSize={14}
                        textAnchor="middle"
                      >
                        {data[i].category}
                      </Text>
                    </g>
                  )}
                </g>
              );
            });
          }}
        </Pie>
      </Group>
    </svg>
  );
} 