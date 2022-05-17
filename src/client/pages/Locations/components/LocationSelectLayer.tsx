import { LatLngExpression, LeafletMouseEvent } from "leaflet";
import React, { useEffect, useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import { geocodeLocation } from "../../../shared/api/locationsApi";
import { parseCoordinates, toCoordinatesString } from "../../../shared/utils";
import { SetLocation } from "../types";

interface Props {
  setLocation: SetLocation;
  coordinates: string;
}

export default function LocationSelectLayer({ setLocation, coordinates }: Props) {
  const [position, setPosition] = useState<LatLngExpression>(null);

  useEffect(() => {
    const latLng = parseCoordinates(coordinates);
    if (latLng != null) {
      setPosition({ lat: latLng.lat, lng: latLng.lng });
    }
  }, [coordinates]);

  useMapEvents({
    click(e: LeafletMouseEvent) {
      setPosition(e.latlng);
      geocodeLocation(e.latlng.lng, e.latlng.lat).then(location => {
        const coordinates = toCoordinatesString(e.latlng);
        setLocation(coordinates, location.city, location.country);
      });
    }
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>Вы здесь</Popup>
    </Marker>
  );
}