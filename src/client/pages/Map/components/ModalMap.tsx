import React from 'react';
import { MapContainer } from 'react-leaflet';
import { MapTileLayer } from '../../../shared/components/MapTileLayer';
import { ACCESS_TOKEN } from '../../../shared/constants';
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
      zoom={5}
      center={[53.90069725440663, 27.554054260253906]}>
      <MapTileLayer accessToken={ACCESS_TOKEN} />
      <LocationSelectLayer setLocation={setLocation} coordinates={coordinates} />
    </MapContainer>
  );
}