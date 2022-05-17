import { createSelector } from "reselect";
import { parseCoordinates } from "../../shared/utils";
import { LocationsState } from "./locationsSlice";
import { LocationMarker } from "./types";

const state = (state: LocationsState) => state;
const getLoaders = (state: LocationsState) => state.loaders;
const getLocations = (state: LocationsState) => state.locations;

export const getMarkers = createSelector(
  getLocations,
  locations => {
    return locations.map(l => {
      const coordinates = parseCoordinates(l.coords);
      return {
        id: l.id,
        fullName: l.fullName,
        additionalInfo: l.additionalInfo,
        position: [coordinates.lat, coordinates.lng]
      } as LocationMarker;
    });
  }
);

export const getUserInfo = (state: LocationsState) => state.currentUserInfo;

export const getUserInfoModalIsVisible = (state: LocationsState) => state.locationUpdateModalIsVisible;

export const getUserCoordinates = createSelector(getUserInfo, info => {
  const latLng = parseCoordinates(info?.coords);

  return latLng;
});

export const getUpdateUserInfoRequestInProgress = createSelector(
  getLoaders,
  state => state.fetchLocationsRequest
);
