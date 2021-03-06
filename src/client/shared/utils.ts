import { LatLng, LatLngLiteral } from "leaflet";
import isEmpty from 'lodash/isEmpty';
import { MigrationStatus, UserInfoUpdateForm } from "../pages/Locations/types";
import { ACCESS_TOKEN, USER_DATA_TOKEN_KEY, USER_ID_TOKEN_KEY } from "./constants";

export function makeApiUrl(segment: string): string {
  segment = segment.startsWith('/') ? segment.substring(1) : segment;

  return `${process.env.API_URL}/${segment}`;
}

export function makeGeocodingUrl(lng: number, lat: number): string {
  return `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${ACCESS_TOKEN}`;
}

export function uuidv4(): string {
  return (([1e7] as any) + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c: any) =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

export function parseCoordinates(coordinates: string): LatLngLiteral | null {
  if (isEmpty(coordinates)) {
    return null;
  }
  const values = coordinates.split(/,\s/g).map(Number);
  return { lat: values[0], lng: values[1] };
}

export function toCoordinatesString(latLng: LatLng): string {
  return `${latLng.lat}, ${latLng.lng}`;
}

export function saveUserIdTokenToLocalStorage(): void {
  if (!localStorage.getItem(USER_ID_TOKEN_KEY)) {
    localStorage.setItem(USER_ID_TOKEN_KEY, uuidv4());
  }
}

export function getSavedUserInfo(): UserInfoUpdateForm {
  const savedUserInfo = JSON.parse(localStorage.getItem(USER_DATA_TOKEN_KEY)) ?? {};
  return {
    ...savedUserInfo,
    id: savedUserInfo.id ?? uuidv4(),
    fullName: savedUserInfo.fullName ?? '',
    status: savedUserInfo.status ?? MigrationStatus.Working,
    coords: savedUserInfo.coords ?? '',
    country: savedUserInfo.country ?? '',
    city: savedUserInfo.city ?? '',
    additionalInfo: savedUserInfo.additionalInfo ?? ''
  };
}
