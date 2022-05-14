import React from 'react';
import { MapContainer } from 'react-leaflet';
import { MapTileLayer } from '../../../shared/components/MapTileLayer';
import { MAIN_MAP_DEFAULTS } from '../../../shared/constants';
import { LocationMarker } from '../types';
import { LocationMarkerList } from './LocationMarkerList';

interface Props {
  markers: LocationMarker[];
}

export function MainMap({ markers }: Props) {
  return (
    <MapContainer
      className="main-map"
      scrollWheelZoom={true}
      zoom={MAIN_MAP_DEFAULTS.ZOOM}>
      <MapTileLayer />
      <LocationMarkerList markers={markers} />
    </MapContainer>
  );
}