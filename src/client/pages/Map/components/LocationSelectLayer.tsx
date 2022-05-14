import { LatLngExpression, LeafletMouseEvent } from "leaflet";
import React, { useEffect, useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import { parseCoordinates } from "../../../shared/utils";
import { useLocationsApi } from "../hooks/useLocationsApi";
import { SetLocation } from "../types";

interface Props {
  setLocation: SetLocation;
  coordinates: string;
}

export default function LocationSelectLayer({ setLocation, coordinates }: Props) {
  const [position, setPosition] = useState<LatLngExpression>(null);
  const { geocodeLocation } = useLocationsApi();

  useEffect(() => {
    const latLng = parseCoordinates(coordinates);
    if (latLng != null) {
      setPosition({ lat: latLng.lat, lng: latLng.lng });
    }
  }, [coordinates]);

  const map = useMapEvents({
    click(e: LeafletMouseEvent) {
      setPosition(e.latlng);
      geocodeLocation(e.latlng.lng, e.latlng.lat).then(location => {
        const coordinates = `${e.latlng.lat}, ${e.latlng.lng}`;
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