import { uniq } from "lodash";
import React, { useEffect, useState } from "react";
import { LocationInfo } from "../../Map/types";

interface Props {
  locations: LocationInfo[];
}

export function CityList({ locations }: Props) {
  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    const cities = uniq(locations.map(l => l.city));
    setCities(cities);
  }, [locations]);

  return (
    <p>
      Сотрудники нашей команды находятся в следующих городах: {cities.join(", ")}
    </p>
  );
}