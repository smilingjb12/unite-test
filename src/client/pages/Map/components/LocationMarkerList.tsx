/* eslint-disable @typescript-eslint/no-var-requires */
import { isEmpty } from 'lodash-es';
import React, { useEffect, useRef } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import { LocationMarker } from '../types';
const MarkerClusterGroup = require('react-leaflet-markercluster').default;

interface Props {
  markers: LocationMarker[];
}

export function LocationMarkerList({ markers }: Props) {
  const markerGroup = useRef(null);
  const map = useMap();

  useEffect(() => {
    const bounds = markerGroup.current.getBounds();
    if (!isEmpty(bounds)) {
      map.fitBounds(bounds);
    }
  }, [markers]);

  return (
    <MarkerClusterGroup ref={markerGroup}>
      {markers.map(m => (
        <Marker key={m.id} position={m.position}>
          <Popup>
            <b>{m.fullName}</b>
            <br />
            {m.additionalInfo}
          </Popup>
        </Marker>
      ))}
    </MarkerClusterGroup>
  );
}