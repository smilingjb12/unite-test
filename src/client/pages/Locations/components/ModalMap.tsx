import React from 'react';
import { MapContainer } from 'react-leaflet';
import { MapTileLayer } from '../../../shared/components/MapTileLayer';
import { MAP_DEFAULTS } from '../../../shared/constants';
import { SetLocation } from '../types';
import LocationSelectLayer from './LocationSelectLayer';

interface Props {
  setLocation: SetLocation;
  coordinates: string;
}

export function ModalMap({ setLocation, coordinates }: Props) {

  return (
    <MapContainer
      className="modal-map"
      scrollWheelZoom={true}
      zoom={MAP_DEFAULTS.MODAL.ZOOM}
      center={MAP_DEFAULTS.MODAL.CENTER}>
      <MapTileLayer />
      <LocationSelectLayer setLocation={setLocation} coordinates={coordinates} />
    </MapContainer>
  );
}