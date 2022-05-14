import { LatLngExpression } from "leaflet";

export interface LocationMarker {
  id: string;
  position: LatLngExpression;
  fullName: string;
  additionalInfo: string;
}

export enum MigrationStatus {
  Working = 0,
  Planning = 1,
  Temporary = 2
}

export interface LocationInfo {
  additionalInfo: string;
  city: string;
  coords: string;
  country: string;
  createdAt: Date;
  fullName: string;
  id: string;
  status: MigrationStatus;
  updatedAt: Date;
}

export interface LocationInfoForm {
  id: string;
  fullName: string;
  status: string;
  coords: string;
  country: string;
  city: string;
  additionalInfo: string;
}

export interface GeocodingInfo {
  city: string;
  country: string;
}

export type SetLocation = (coordinates: string, city: string, country: string) => void;