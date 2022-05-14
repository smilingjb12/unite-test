import React from "react";
import { TileLayer } from "react-leaflet";
import { ACCESS_TOKEN } from "../constants";

export function MapTileLayer() {
  return (
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
      maxZoom={18}
      id={'mapbox/streets-v11'}
      tileSize={512}
      zoomOffset={-1}
      accessToken={ACCESS_TOKEN}
    />
  )
}