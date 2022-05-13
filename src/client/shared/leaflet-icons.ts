import L from "leaflet";
import { makeApiUrl } from "./utils";

export function addLeafletIcons(): void {
  const [width, height] = [25, 41];
  const DefaultIcon = L.icon({
    iconUrl: makeApiUrl('/images/marker-icon.png'),
    shadowUrl: makeApiUrl('/images/marker-shadow.png'),
    iconSize: [width, height],
    iconAnchor: [width / 2, height],
    popupAnchor: [0, -33]
  });

  L.Marker.prototype.options.icon = DefaultIcon;
}