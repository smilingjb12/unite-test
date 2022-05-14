import { USER_DATA_TOKEN_KEY } from "../../../shared/constants";
import { parseCoordinates } from "../../../shared/utils";
import { LocationInfo, LocationInfoForm, LocationMarker, MigrationStatus } from "../types";

export function useLocationsMap() {
  function makeMarkers(locations: LocationInfo[]): LocationMarker[] {
    return locations.map(l => {
      const coordinates = parseCoordinates(l.coords);
      return {
        id: l.id,
        fullName: l.fullName,
        additionalInfo: l.additionalInfo,
        position: [coordinates.lat, coordinates.lng]
      }
    })
  }

  function getCurrentUserInfo(): LocationInfoForm {
    const savedUserInfo = JSON.parse(localStorage.getItem(USER_DATA_TOKEN_KEY)) ?? {};
    return { ...savedUserInfo, status: savedUserInfo.status ?? MigrationStatus.Working };
  }

  return { makeMarkers, getCurrentUserInfo };
}