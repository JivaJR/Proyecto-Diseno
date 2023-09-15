import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
const taxiicon = '../../../public/taxiIcon.png'
const flagicon = '../../../public/flag.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png';


export const MarkerIcon = L.icon({
    iconUrl: taxiicon,
    iconSize:[32,42],
    iconAnchor:[16,42],
    shadowUrl: iconShadow
});

export const MarkerIconFlag = L.icon({
    // iconUrl: icon,
    iconUrl: flagicon,
    shadowUrl: iconShadow,
    iconSize:[32,42],
    iconAnchor:[16,42],
});

// export const CircleIcon = L.icon({
//     iconUrl: redcircle,
//     iconSize:[10,10],
// });

// export const StartIcon = L.icon({
//     iconUrl : start,
//     iconSize: [30,30]
// })
