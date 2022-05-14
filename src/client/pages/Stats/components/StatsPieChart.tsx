import React from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { CHART_COLORS } from "../../../shared/constants";
import { PieChartItem } from "../types";

interface Props {
  items: PieChartItem[];
  title: string;
}

export function StatsPieChart({ items, title }: Props) {
  const legendFormatter = (value: any, entry: any) => {
    const { color } = entry;
    return <span style={{ color: '#797979' }}>{value}</span>
  }

  return (
    <React.Fragment>
      <h2 className="text-center">{title}</h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={800} height={800}>
          <Legend
            layout="horizontal"
            verticalAlign="top"
            align="center"
            formatter={legendFormatter} />
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={items}
            cx="50%"
            cy="50%"
            outerRadius={220}
            fill="#8884d8"
            label
          >
            {items.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={CHART_COLORS[index % CHART_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}