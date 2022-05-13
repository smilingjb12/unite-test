import React, { useEffect, useState } from "react";
import { LocationInfo } from "../../Map/types";
import { useLocationStats } from "../hooks/useLocationStats";
import { MainStatItem } from "../types";

interface Props {
  locations: LocationInfo[];
}

export function MainStatsTable({ locations }: Props) {
  const { makeMainStatItems } = useLocationStats();
  const [mainStatItems, setMainStatItems] = useState<MainStatItem[]>([]);

  useEffect(() => {
    setMainStatItems(makeMainStatItems(locations));
  }, [locations]);

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
    </table>
  );
}