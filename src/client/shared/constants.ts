import { LatLngLiteral } from "leaflet";

export const USER_ID_TOKEN_KEY = "USER_ID";
export const USER_DATA_TOKEN_KEY = "USER_DATA";
export const ACCESS_TOKEN = process.env.MAP_ACCESS_TOKEN;

export const CHART_COLORS = [
  '#96ceb4',
  '#ffeead',
  '#ffcc5c',
  '#ff6f69',
];

export const MAIN_MAP_DEFAULTS = {
  ZOOM: 5,
  CENTER: {
    lat: 52.45835188280866,
    lng: 30.00292968750001
  } as LatLngLiteral
};
