import orderBy from 'lodash/orderBy';
import sumBy from 'lodash/sumBy';
import uniq from 'lodash/uniq';
import { createSelector } from "reselect";
import { LocationsState } from "../Locations/locationsSlice";
import { MigrationStatus } from "../Locations/types";
import { StatsState } from './statsSlice';
import { MainStatItem, MainStatTotals } from "./types";

const getLocations = (state: LocationsState) => state.locations;

const getUniqueCities = createSelector(
  getLocations,
  locations => uniq(locations.map(l => l.city))
);

export const getSourceItemsModalIsVisible = (state: StatsState) => state.sourceItemsModalIsVisible;

export const getUniqueCitiesString = createSelector(
  getUniqueCities,
  cities => cities.join(", ")
);

export const getMainStatItems = createSelector(
  getLocations,
  locations => {
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
);

export const getMainStatTotals = createSelector(getMainStatItems, items => {
  return {
    total: sumBy(items, i => i.total),
    working: sumBy(items, i => i.working),
    planning: sumBy(items, i => i.planning),
    temporary: sumBy(items, i => i.temporary)
  } as MainStatTotals;
});

export const getSourceStatItems = createSelector(
  getLocations,
  locations => {
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
);

export const getStatusPieChartItems = createSelector(
  getLocations,
  locations => {
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

    const items = statuses.map(s => ({
      name: statusNameMap[s],
      value: locations.filter(l => l.status === s).length
    }));

    return orderBy(items, i => i.value, ['desc']);
  }
);

export const getCountryPieChartItems = createSelector(
  getLocations,
  locations => {
    const countries = uniq(locations.map(l => l.country));

    const items = countries.map(c => ({
      name: c,
      value: locations.filter(l => l.country === c).length
    }));

    return orderBy(items, i => i.value, ['desc']);
  }
);
