import React from "react";
import { useLocationStats } from "../hooks/useLocationStats";

export function CityList() {
  const stats = useLocationStats();

  return (
    <p>
      Сотрудники нашей команды находятся в следующих городах: {stats.uniqueCitiesString}
    </p>
  );
}