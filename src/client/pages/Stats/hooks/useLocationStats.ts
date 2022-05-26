import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { LocationsState } from "../../Locations/locationsSlice";
import { getCountryPieChartItems, getMainStatItems, getMainStatTotals, getSourceItemsModalIsVisible, getSourceStatItems, getStatusPieChartItems, getUniqueCitiesString } from "../selectors";
import { StatsState } from "../statsSlice";

export function useLocationStats() {
  const locationsState = useSelector<RootState, LocationsState>(state => state.locations);
  const statsState = useSelector<RootState, StatsState>(state => state.stats);
  const uniqueCitiesString = getUniqueCitiesString(locationsState);
  const mainStatItems = getMainStatItems(locationsState);
  const mainStatTotals = getMainStatTotals(locationsState);
  const sourceStatItems = getSourceStatItems(locationsState);
  const statusPieChartItems = getStatusPieChartItems(locationsState);
  const countryPieChartItems = getCountryPieChartItems(locationsState);
  const sourceStatsModalIsVisible = getSourceItemsModalIsVisible(statsState);

  return {
    uniqueCitiesString,
    mainStatItems,
    mainStatTotals,
    sourceStatItems,
    statusPieChartItems,
    countryPieChartItems,
    sourceStatsModalIsVisible
  };
}