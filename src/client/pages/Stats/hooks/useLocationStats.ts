import { orderBy, uniq } from "lodash";
import { LocationInfo, MigrationStatus } from "../../Map/types";
import { MainStatItem, PieChartItem, SourceStatItem } from "../types";

export function useLocationStats() {
  function makeMainStatItems(locations: LocationInfo[] = []): MainStatItem[] {
    const countries: string[] = uniq(locations.map(l => l.country));
    const items: MainStatItem[] = countries.map(c => {
      const countryLocations = locations.filter(l => l.country === c);
      return {
        country: c,
        total: countryLocations.length,
        working: countryLocations.filter(l => l.status === MigrationStatus.Working).length,
        planning: countryLocations.filter(l => l.status === MigrationStatus.Planning).length,
        temporary: countryLocations.filter(l => l.status === MigrationStatus.Temporary).length
      };
    });

    return orderBy(items, i => i.total, ['desc']);
  }

  function makeSourceStatItems(locations: LocationInfo[] = []): SourceStatItem[] {
    const statusNameMap: Record<MigrationStatus, string> = {
      [MigrationStatus.Working]: "Уже оформлен в офис",
      [MigrationStatus.Planning]: "Планирует оформляться",
      [MigrationStatus.Temporary]: "Находится временно"
    };

    return locations.map(l => ({
      fullName: l.fullName,
      country: l.country,
      city: l.city,
      statusName: statusNameMap[l.status]
    }));
  }

  function makeStatusPieChartItems(locations: LocationInfo[] = []): PieChartItem[] {
    const statuses = [
      MigrationStatus.Planning,
      MigrationStatus.Temporary,
      MigrationStatus.Working
    ];

    const statusNameMap: Record<MigrationStatus, string> = {
      [MigrationStatus.Working]: "Оформлено в офис",
      [MigrationStatus.Planning]: "Планируют оформляться",
      [MigrationStatus.Temporary]: "Находятся временно"
    };

    return statuses.map(s => ({
      name: statusNameMap[s],
      value: locations.filter(l => l.status === s).length
    }));
  }

  function makeCountryPieChartItems(locations: LocationInfo[] = []): PieChartItem[] {
    const countries = uniq(locations.map(l => l.country));

    return countries.map(c => ({
      name: c,
      value: locations.filter(l => l.country === c).length
    }));
  }

  return {
    makeMainStatItems,
    makeSourceStatItems,
    makeStatusPieChartItems,
    makeCountryPieChartItems
  };
}