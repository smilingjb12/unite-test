import { parseCoordinates } from "../../../shared/utils";
import { LocationInfo, LocationMarker } from "../types";

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

  return { makeMarkers };
}