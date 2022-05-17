import React from "react";
import { useAppDispatch } from "../../../store";
import { useLocationStats } from "../hooks/useLocationStats";

export function MainStatsTable() {
  const dispatch = useAppDispatch();
  const stats = useLocationStats();

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
        {stats.mainStatItems.map((item, index) => (
          <tr key={index}>
            <td>{item.country}</td>
            <td>{item.total}</td>
            <td>{item.working}</td>
            <td>{item.planning}</td>
            <td>{item.temporary}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}