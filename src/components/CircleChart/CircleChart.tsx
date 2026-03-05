'use client';

import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './CircleChart.module.css';

/**
 * Composant de graphique circulaire (donut chart) réutilisable
 * @param {Object} props
 * @param {Array} props.data
 * @param {number} props.outerRadius
 * @param {number} props.innerRadius
 * @param {boolean} props.showLegend
 * @param {boolean} props.showTooltip
 * @param {string} props.centerLabel
 */
export default function ChartCirculaire({
  data,
  outerRadius = '80%',
  innerRadius = '60%',
  showLegend = true,
  showTooltip = true,
  centerLabel = null,
  width = '100%',
  height = 400,
}: {
  data: Array<{ name: string; value: number; fill: string }>;
  outerRadius?: string;
  innerRadius?: string;
  showLegend?: boolean;
  showTooltip?: boolean;
  centerLabel?: string | null;
  width?: string;
  height?: number;
}) {
  return (
    <div className={styles.container} style={{ width, height }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={outerRadius}
            innerRadius={innerRadius}
            isAnimationActive={true}
            label
          >
            {data.map((entry: { fill: string | undefined; }, index: any) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          {showTooltip && <Tooltip />}
          {showLegend && <Legend />}
        </PieChart>
      </ResponsiveContainer>
      {centerLabel && (
        <div className={styles.centerLabel}>
          {centerLabel}
        </div>
      )}
    </div>
  );
}