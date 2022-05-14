import axios from "axios";
import isEmpty from "lodash/isEmpty";
import { USER_DATA_TOKEN_KEY } from "../../../shared/constants";
import { makeApiUrl, makeGeocodingUrl, uuidv4 } from "../../../shared/utils";
import { GeocodingInfo, LocationInfo, LocationInfoForm } from "../types";

export function useLocationsApi() {
  async function fetchLocations(): Promise<LocationInfo[]> {
    const response = await axios.get<LocationInfo[]>(makeApiUrl('/api/locations'))

    return response.data;
  }

  async function geocodeLocation(lng: number, lat: number): Promise<GeocodingInfo> {
    const response = await axios.get<any>(makeGeocodingUrl(lng, lat));
    const cityFeature = response.data.features.find((feature: any) => feature.place_type.includes('place'));
    const city = cityFeature ? cityFeature.text : 'Not defined';
    const country = response.data.features.find((feature: any) => feature.place_type.includes('country')).text;

    return { city, country };
  }

  async function updateLocation(formData: LocationInfoForm): Promise<void> {
    if (isEmpty(formData.id)) {
      formData.id = uuidv4();
    }
    await axios.post(makeApiUrl('/api/locations'), formData);
    localStorage.setItem(USER_DATA_TOKEN_KEY, JSON.stringify(formData));
  }

  return {
    fetchLocations,
    geocodeLocation,
    updateLocation
  };
}
