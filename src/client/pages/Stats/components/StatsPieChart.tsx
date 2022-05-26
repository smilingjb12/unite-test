import React from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { CHART } from "../../../shared/constants";
import { PieChartItem } from "../types";

interface Props {
  items: PieChartItem[];
  title: string;
}

export function StatsPieChart({ items, title }: Props) {
  const legendFormatter = (value: any, entry: any) => {
    return <span style={{ color: CHART.PIE_CHART.LEGEND_TEXT_COLOR }}>{value}</span>
  };

  const getSectorFillColor = (index: number): string => {
    return CHART.COLORS[index % CHART.COLORS.length];
  };

  return (
    <React.Fragment>
      <h2 className="text-center">{title}</h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={CHART.PIE_CHART.WIDTH} height={CHART.PIE_CHART.HEIGHT}>
          <Legend
            layout="horizontal"
            verticalAlign="top"
            align="center"
            formatter={legendFormatter} />
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={items}
            cx={CHART.PIE_CHART.CIRCLE_X}
            cy={CHART.PIE_CHART.CIRCLE_Y}
            outerRadius={CHART.PIE_CHART.OUTER_RADIUS}
            fill={CHART.PIE_CHART.BASE_FILL_COLOR}
            label>
            {items.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={getSectorFillColor(index)} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}