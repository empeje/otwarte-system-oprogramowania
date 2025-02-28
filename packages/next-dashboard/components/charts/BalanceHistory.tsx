'use client';

import {useMemo} from 'react';
import {AxisLeft, AxisBottom} from '@visx/axis';
import {scaleLinear, scaleTime} from '@visx/scale';
import {Group} from '@visx/group';
import {LinePath, AreaClosed} from '@visx/shape';
import {curveMonotoneX} from '@visx/curve';
import {GridColumns, GridRows} from '@visx/grid';
import {LinearGradient} from "@visx/gradient";

interface BalanceHistoryProps {
  data: {
    date: Date;
    balance: number;
  }[];
  width?: number;
  height?: number;
}

export function BalanceHistory({
                                 data,
                                 width = 800,
                                 height = 400
                               }: BalanceHistoryProps) {
  // Margins
  const margin = {top: 35, right: 25, bottom: 70, left: 80};
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Scales
  const xScale = useMemo(
    () => scaleTime({
      range: [0, innerWidth],
      domain: [
        Math.min(...data.map(d => new Date(d.date).getTime())),
        Math.max(...data.map(d => new Date(d.date).getTime()))
      ],
    }),
    [data, innerWidth]
  );

  const yScale = useMemo(
    () => scaleLinear({
      range: [innerHeight, 0],
      domain: [0, Math.max(...data.map(d => d.balance)) * 1.1],
      nice: true,
    }),
    [data, innerHeight]
  );

  return (
    <svg width={width} height={height}>
      <Group left={margin.left} top={margin.top}>
        {/* Grid lines */}
        <GridRows
          scale={yScale}
          width={innerWidth}
          strokeDasharray="4"
          stroke="#e0e0e0"
          strokeOpacity={0.8}
          pointerEvents="none"
        />
        {/* Vertical lines */}
        <GridColumns
          scale={xScale}
          height={innerHeight}
          strokeDasharray="4"
          stroke="#e0e0e0"
          strokeOpacity={0.8}
          pointerEvents="none"
        />

        <LinearGradient
          id="gradient"
          from="#2d60ff"
          to="#2d60ff"
          toOpacity={0}
        />
        {/* Area chart */}
        <AreaClosed
          data={data}
          x={d => xScale(new Date(d.date))}
          y={d => yScale(d.balance)}
          yScale={yScale}
          fill="url(#gradient)"
          fillOpacity={0.3}
          curve={curveMonotoneX}
        />

        {/* Line chart */}
        <LinePath
          data={data}
          x={d => xScale(new Date(d.date))}
          y={d => yScale(d.balance)}
          stroke="#1814F3"
          strokeWidth={3}
          curve={curveMonotoneX}
        />

        {/* Axes */}
        <AxisLeft
          scale={yScale}
          stroke="#DFE5EE"
          strokeDasharray="4"
          tickStroke="#718EBF"
          tickFormat={value => `${value}`}
          tickLabelProps={() => ({
            fill: '#718EBF',
            fontSize: 13,
            textAnchor: 'end',
            dy: '0.33em',
            dx: -4,
          })}
        />
        <AxisBottom
          top={innerHeight}
          scale={xScale}
          stroke="transparent"
          tickStroke="#718EBF"
          tickFormat={date => {
            const d = new Date(date as Date);
            return d.toLocaleString('default', {month: 'short'});
          }}
          tickLabelProps={() => ({
            fill: '#718EBF',
            fontSize: 14,
            textAnchor: 'middle',
            dy: '1em',
          })}
        />
      </Group>
    </svg>
  );
} 