import React from 'react';
import { MapContainer } from 'react-leaflet';
import { MapTileLayer } from '../../../shared/components/MapTileLayer';
import { LocationMarker } from '../types';
import { LocationMarkerList } from './LocationMarkerList';

interface Props {
  markers: LocationMarker[];
}

export function MainMap({ markers }: Props) {
  return (
    <MapContainer
      className="main-map"
      scrollWheelZoom={true}>
      <MapTileLayer />
      <LocationMarkerList markers={markers} />
    </MapContainer>
  );
}