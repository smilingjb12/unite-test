import React from 'react';
import { MapContainer } from 'react-leaflet';
import { MapTileLayer } from '../../../shared/components/MapTileLayer';
import { MAIN_MAP_DEFAULTS } from '../../../shared/constants';
import { LocationMarkerList } from './LocationMarkerList';

export function MainMap() {

  return (
    <MapContainer
      className="main-map"
      scrollWheelZoom={true}
      zoom={MAIN_MAP_DEFAULTS.ZOOM}>
      <MapTileLayer />
      <LocationMarkerList />
    </MapContainer>
  );
}