import { LatLngLiteral } from "leaflet";
import { ACCESS_TOKEN, USER_ID_TOKEN_KEY } from "./constants";

export function makeApiUrl(segment: string): string {
  segment = segment.startsWith('/') ? segment.substring(1) : segment;
  if (process.env.NODE_ENV.toLowerCase() === 'production') {
    return `${process.env.API_URL}/${segment}`;
  }
  return `http://localhost:${process.env.PORT}/${segment}`;
}

export function makeGeocodingUrl(lng: number, lat: number): string {
  return `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${ACCESS_TOKEN}`;
}

export function uuidv4() {
  return (([1e7] as any) + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c: any) =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

export function parseCoordinates(coordinates: string): LatLngLiteral | null {
  if (coordinates == null) {
    return null;
  }
  const values = coordinates.split(/,\s/g).map(Number);
  return { lat: values[0], lng: values[1] };
}

export function saveUserIdTokenToLocalStorage() {
  if (!localStorage.getItem(USER_ID_TOKEN_KEY)) {
    localStorage.setItem(USER_ID_TOKEN_KEY, uuidv4());
  }
}