import axios from "axios";
import { GeocodingInfo, LocationInfo, UserLocationInfo } from "../../pages/Locations/types";
import { makeApiUrl, makeGeocodingUrl } from "../utils";

export async function fetchLocations(): Promise<LocationInfo[]> {
  const response = await axios.get<LocationInfo[]>(makeApiUrl('/api/locations'))

  return response.data;
}

export async function geocodeLocation(lng: number, lat: number): Promise<GeocodingInfo> {
  const response = await axios.get<any>(makeGeocodingUrl(lng, lat));
  const cityFeature = response.data.features.find((feature: any) => feature.place_type.includes('place'));
  const city = cityFeature ? cityFeature.text : 'Not defined';
  const country = response.data.features.find((feature: any) => feature.place_type.includes('country')).text;

  return { city, country } as GeocodingInfo;
}

export async function updateLocation(formData: UserLocationInfo): Promise<void> {
  await axios.post(makeApiUrl('/api/locations'), formData);
}