import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { LocationsState } from "../locationsSlice";
import { getMarkers, getUpdateUserInfoRequestInProgress, getUserCoordinates, getUserInfo, getUserInfoModalIsVisible } from "../selectors";

export function useLocations() {
  const state = useSelector<RootState, LocationsState>(state => state.locations);
  const userInfoModalIsVisible = getUserInfoModalIsVisible(state);
  const markers = getMarkers(state);
  const userInfo = getUserInfo(state);
  const userCoordinates = getUserCoordinates(state);
  const updateUserInfoRequestInProgress = getUpdateUserInfoRequestInProgress(state);

  return {
    userInfoModalIsVisible,
    userInfo,
    markers,
    userCoordinates,
    updateUserInfoRequestInProgress
  };
}