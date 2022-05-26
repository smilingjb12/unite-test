import React from 'react';
import { MapContainer } from 'react-leaflet';
import { MapTileLayer } from '../../../shared/components/MapTileLayer';
import { MAP_DEFAULTS } from '../../../shared/constants';
import { LocationMarkerList } from './LocationMarkerList';

export function MainMap() {

  return (
    <MapContainer
      className="main-map"
      scrollWheelZoom={true}
      zoom={MAP_DEFAULTS.MAIN.ZOOM}>
      <MapTileLayer />
      <LocationMarkerList />
    </MapContainer>
  );
}