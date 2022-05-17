/* eslint-disable @typescript-eslint/no-var-requires */
import isEmpty from 'lodash/isEmpty';
import React, { useEffect, useRef } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import { useLocations } from '../hooks/useLocations';
const MarkerClusterGroup = require('react-leaflet-markercluster').default;

export function LocationMarkerList() {
  const markerGroup = useRef(null);
  const map = useMap();
  const data = useLocations();

  useEffect(() => {
    const bounds = markerGroup.current.getBounds();
    if (!isEmpty(bounds)) {
      map.fitBounds(bounds, { animate: false });
    }
  }, [data.markers]);

  return (
    <MarkerClusterGroup ref={markerGroup}>
      {data.markers.map(m => (
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