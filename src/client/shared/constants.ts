import { LatLngLiteral } from "leaflet";

export const USER_ID_TOKEN_KEY = "USER_ID";
export const USER_DATA_TOKEN_KEY = "USER_DATA";
export const ACCESS_TOKEN = process.env.MAP_ACCESS_TOKEN;

export const CHART = {
  COLORS: [
    '#96ceb4',
    '#ffeead',
    '#ffcc5c',
    '#ff6f69',
  ],
  PIE_CHART: {
    WIDTH: 800,
    HEIGHT: 800,
    CIRCLE_X: '50%',
    CIRCLE_Y: '50%',
    BASE_FILL_COLOR: '#8884d8',
    LEGEND_TEXT_COLOR: '#797979',
    OUTER_RADIUS: 220
  }
}

export const MAP_DEFAULTS = {
  MAIN: {
    ZOOM: 5,
    CENTER: {
      lat: 52.45835188280866,
      lng: 30.00292968750001
    } as LatLngLiteral
  },
  MODAL: {
    ZOOM: 5,
    CENTER: {
      lat: 53.90069725440663,
      lng: 27.554054260253906
    } as LatLngLiteral
  }
};

