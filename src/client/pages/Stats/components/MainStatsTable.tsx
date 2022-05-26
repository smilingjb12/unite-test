import React from "react";
import { useLocationStats } from "../hooks/useLocationStats";

export function MainStatsTable() {
  const { mainStatItems, mainStatTotals } = useLocationStats();

  return (
    <table className="table table-default table-hover table-stripped">
      <thead>
        <tr>
          <th>Страна</th>
          <th>Всего</th>
          <th>Оформлено в офис</th>
          <th>Планируют оформляться</th>
          <th>Находятся временно</th>
        </tr>
      </thead>
      <tbody>
        {mainStatItems.map((item, index) => (
          <tr key={index}>
            <td>{item.country}</td>
            <td>{item.total}</td>
            <td>{item.working}</td>
            <td>{item.planning}</td>
            <td>{item.temporary}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <th>Итого:</th>
          <th>{mainStatTotals.total}</th>
          <th>{mainStatTotals.working}</th>
          <th>{mainStatTotals.planning}</th>
          <th>{mainStatTotals.temporary}</th>
        </tr>
      </tfoot>
    </table>
  );
}