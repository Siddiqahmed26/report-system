// @ts-nocheck

// 'use client';

// import React, { useEffect, useState } from 'react';
// import 'leaflet/dist/leaflet.css';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import L from 'leaflet';
// import axios from 'axios';

// const MapView = () => {
//   const [coordinates, setCoordinates] = useState([]);
//   const center = [13.167884, 77.558751];

//   const customIcon = new L.Icon({
//     iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//     popupAnchor: [1, -34],
//   });

//   useEffect(() => {
//     axios
//       .get(`/api/coordinates`)
//       .then((result) => {
//         setCoordinates(result?.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   return (
//     <MapContainer
//       center={center}
//       zoom={25}
//       scrollWheelZoom={true}
//       style={{
//         width: '80vw',
//         height: '90vh',
//       }}
//       className='mx-auto map-z-index'
//     >
//       <TileLayer
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
//       />
//       {coordinates?.data?.map((each: any) => {
//         return (
//           <Marker position={each?.coordinates} icon={customIcon}>
//             <Popup>{each?.description}</Popup>
//           </Marker>
//         );
//       })}
//     </MapContainer>
//   );
// };

// export default MapView;


// // // @ts-nocheck
// 'use client';

// import React, { useEffect, useState } from 'react';
// import 'leaflet/dist/leaflet.css';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import L from 'leaflet';
// import axios from 'axios';

// const MapView = () => {
//   const [coordinates, setCoordinates] = useState<any[]>([]);
//   const center: [number, number] = [13.167884, 77.558751];

//   const customIcon = new L.Icon({
//     iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//     popupAnchor: [1, -34],
//   });

//   // Fetch incident coordinates (NO GEOLOCATION HERE)
//   useEffect(() => {
//     const fetchCoordinates = async () => {
//       try {
//         const result = await axios.get('/api/coordinates');

//         // SAFETY: ensure array
//         if (Array.isArray(result?.data?.data)) {
//           setCoordinates(result.data.data);
//         } else {
//           setCoordinates([]);
//         }
//       } catch (error) {
//         console.error('Failed to fetch coordinates', error);
//         setCoordinates([]);
//       }
//     };

//     fetchCoordinates();
//   }, []);

//   return (
//     <MapContainer
//       center={center}
//       zoom={17}
//       scrollWheelZoom={true}
//       style={{
//         width: '80vw',
//         height: '90vh',
//       }}
//       className="mx-auto map-z-index"
//     >
//       <TileLayer
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />

//       {/* SAFELY render markers */}
//       {coordinates.length > 0 &&
//         coordinates.map((each: any, index: number) => {
//           // if (!Array.isArray(each?.coordinates)) return null;
//           if (
//             typeof each.latitude !== 'number' ||
//             typeof each.longitude !== 'number'
//           ) {
//             return null; // skip marker safely
//           }
      

//           return (
//             <Marker
//               key={index}
//               // position={each.coordinates}
//               position={[each.latitude, each.longitude]}
//               icon={customIcon}
//             >
//               <Popup>
//                 {each?.description || 'Incident reported'}
//               </Popup>
//             </Marker>
//           );
//         })}
//     </MapContainer>
//   );
// };

// export default MapView;

// @ts-nocheck
'use client';

import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';

/* ---------- AUTO ZOOM TO MARKERS ---------- */
const FitBounds = ({ points }: { points: any[] }) => {
  const map = useMap();

  useEffect(() => {
    if (points.length > 0) {
      const bounds = points.map((p) => p.coordinates);
      map.fitBounds(bounds, { padding: [60, 60] });
    }
  }, [points, map]);

  return null;
};

/* ---------- MAIN MAP ---------- */
const MapView = () => {
  const [points, setPoints] = useState<any[]>([]);
  const center: [number, number] = [13.167884, 77.558751];

  const customIcon = new L.Icon({
    iconUrl:
      'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  /* ---------- FETCH COORDINATES ---------- */
  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const res = await axios.get('/api/coordinates');
        if (Array.isArray(res?.data?.data)) {
          setPoints(res.data.data);
        } else {
          setPoints([]);
        }
      } catch (err) {
        console.error('Failed to fetch coordinates', err);
        setPoints([]);
      }
    };

    fetchCoordinates();
  }, []);

  return (
    <MapContainer
      center={center}
      zoom={17}
      scrollWheelZoom
      style={{ width: '80vw', height: '90vh' }}
      className="mx-auto map-z-index"
    >
      {/* AUTO-FOCUS TO MARKERS */}
      <FitBounds points={points} />

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* RENDER MARKERS */}
      {points.map((item: any, index: number) => {
        if (!Array.isArray(item.coordinates)) return null;

        return (
          <Marker
            key={index}
            position={item.coordinates}
            icon={customIcon}
          >
            <Popup>
              {item.description || 'Incident reported'}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default MapView;

