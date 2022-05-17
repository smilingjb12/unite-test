import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { LocationsState } from "../../Locations/locationsSlice";
import { getCountryPieChartItems, getMainStatItems, getSouceItemsModalIsVisible, getSourceStatItems, getStatusPieChartItems, getUniqueCitiesString } from "../selectors";
import { StatsState } from "../statsSlice";

export function useLocationStats() {
  const locationsState = useSelector<RootState, LocationsState>(state => state.locations);
  const statsState = useSelector<RootState, StatsState>(state => state.stats);
  const uniqueCitiesString = getUniqueCitiesString(locationsState);
  const mainStatItems = getMainStatItems(locationsState);
  const sourceStatItems = getSourceStatItems(locationsState);
  const statusPieChartItems = getStatusPieChartItems(locationsState);
  const countryPieChartItems = getCountryPieChartItems(locationsState);
  const sourceStatsModalIsVisible = getSouceItemsModalIsVisible(statsState);

  return {
    uniqueCitiesString,
    mainStatItems,
    sourceStatItems,
    statusPieChartItems,
    countryPieChartItems,
    sourceStatsModalIsVisible
  };
}