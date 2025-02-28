'use client';

import { useMemo } from 'react';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { scaleBand, scaleLinear } from '@visx/scale';
import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import { useTooltip, Tooltip, defaultStyles } from '@visx/tooltip';
import { LinearGradient } from '@visx/gradient';

interface WeeklyActivityProps {
  data: {
    week: string;
    deposits: number;
    withdrawals: number;
  }[];
  width?: number;
  height?: number;
}

export function WeeklyActivity({ 
  data,
  width = 800,
  height = 400
}: WeeklyActivityProps) {
  const {
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipLeft = 0,
    tooltipTop = 0,
  } = useTooltip<{
    value: number;
    type: string;
    week: string;
  }>();

  // Margins
  const margin = { top: 68, right: 30, bottom: 63, left: 80 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Scales
  const xScale = useMemo(
    () => scaleBand<string>({
      range: [0, innerWidth],
      domain: data.map(d => d.week),
      padding: 0.35,
    }),
    [data, innerWidth]
  );

  const xSubScale = scaleBand({
    domain: ['black', 'blue'],
    range: [0, xScale.bandwidth()],
    padding: 0.35, // space bar between category
  });

  const yScale = useMemo(() => {
    const maxValue = Math.max(
      ...data.map(d => Math.max(d.deposits, d.withdrawals))
    );
    return scaleLinear<number>({
      range: [innerHeight, 0],
      domain: [0, maxValue * 1.1], // Add 10% padding
      nice: true,
    });
  }, [data, innerHeight]);

  // Bar width
  const barWidth = xScale.bandwidth() / 2;

  return (
    <>
      <svg width={width} height={height}>
        <LinearGradient
          id="deposit-gradient"
          from="#4C6FFF"
          to="#4C6FFF"
          vertical={false}
        />
        <LinearGradient
          id="withdrawal-gradient"
          from="#000000"
          to="#000000"
          vertical={false}
        />
        
        <Group left={margin.left} top={margin.top}>
          {/* Grid lines */}
          {yScale.ticks().map(tick => (
            <line
              key={tick}
              x1={0}
              x2={innerWidth}
              y1={yScale(tick)}
              y2={yScale(tick)}
              stroke="#F3F3F5"
              strokeDasharray="0"
            />
          ))}

          {/* Bars */}
          {data.map((d, i) => {
            const x = xScale(d.week);
            if (typeof x === 'undefined') return null;

            return (
              <g key={`bar-${i}`}>
                {/* Withdrawal bar */}
                <Bar
                  x={x}
                  y={yScale(d.withdrawals)}
                  width={xSubScale.bandwidth()}
                  height={innerHeight - yScale(d.withdrawals)}
                  fill="url(#withdrawal-gradient)"
                  rx={4}
                  onMouseMove={(event) => {
                    const { clientX, clientY } = event;
                    showTooltip({
                      tooltipData: {
                        value: d.withdrawals,
                        type: 'Withdraw',
                        week: d.week,
                      },
                      tooltipLeft: clientX,
                      tooltipTop: clientY,
                    });
                  }}
                  onMouseLeave={hideTooltip}
                />

                {/* Deposit bar */}
                <Bar
                  x={x + barWidth}
                  y={yScale(d.deposits)}
                  width={xSubScale.bandwidth()}
                  height={innerHeight - yScale(d.deposits)}
                  fill="url(#deposit-gradient)"
                  rx={4}
                  onMouseMove={(event) => {
                    const { clientX, clientY } = event;
                    showTooltip({
                      tooltipData: {
                        value: d.deposits,
                        type: 'Deposit',
                        week: d.week,
                      },
                      tooltipLeft: clientX,
                      tooltipTop: clientY,
                    });
                  }}
                  onMouseLeave={hideTooltip}
                />
              </g>
            );
          })}

          {/* Axes */}
          <AxisLeft
            scale={yScale}
            tickFormat={(value) => 
              new Intl.NumberFormat('en-US', {
                style: 'decimal',
                maximumFractionDigits: 0,
              }).format(Number(value))
            }
            stroke="transparent"
            tickStroke="transparent"
            tickLabelProps={() => ({
              fill: '#718EBF',
              fontSize: 13,
              textAnchor: 'end',
              dy: '0.33em',
              dx: -1,
            })}
          />
          <AxisBottom
            top={innerHeight}
            scale={xScale}
            stroke="transparent"
            tickStroke="transparent"
            tickLabelProps={() => ({
              fill: '#718EBF',
              fontSize: 13,
              textAnchor: 'middle',
              dy: '1em',
              angle: -45,
            })}
          />

          {/* Legend */}
          <g transform={`translate(${innerWidth - 150}, -43)`}>
            <circle cx={6} cy={6} r={6} fill="#396AFF" />
            <text x={20} y={10} fontSize={12} fill="#718EBF">Deposit</text>
            <circle cx={86} cy={6} r={6} fill="#232323" />
            <text x={100} y={10} fontSize={12} fill="#718EBF">Withdraw</text>
          </g>
        </Group>
      </svg>

      {/* Tooltip */}
      {tooltipData && (
        <Tooltip
          top={tooltipTop}
          left={tooltipLeft}
          style={{
            ...defaultStyles,
            backgroundColor: 'white',
            color: 'black',
            padding: '0.5rem',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            borderRadius: '0.375rem',
          }}
        >
          <div className="text-sm">
            <div className="font-semibold">{tooltipData.week}</div>
            <div className={tooltipData.type === 'Deposit' ? 'text-blue-500' : 'text-gray-900'}>
              {tooltipData.type}: {new Intl.NumberFormat('en-US', {
                style: 'decimal',
                maximumFractionDigits: 0,
              }).format(tooltipData.value)}
            </div>
          </div>
        </Tooltip>
      )}
    </>
  );
} 