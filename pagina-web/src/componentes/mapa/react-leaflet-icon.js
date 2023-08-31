import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
const taxiicon = '../../../public/taxiIcon.png'
const flagicon = '../../../public/flag.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png';


export const MarkerIcon = L.icon({
    // iconUrl: icon,
    iconUrl: taxiicon,
    shadowUrl: iconShadow
});

export const MarkerIconFlag = L.icon({
    // iconUrl: icon,
    iconUrl: flagicon,
    shadowUrl: iconShadow
});
