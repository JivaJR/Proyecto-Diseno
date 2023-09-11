import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import redcircle from '/redcircle.png'

export const MarkerIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

export const CircleIcon = L.icon({
    iconUrl: redcircle,
    shadowUrl: iconShadow
});