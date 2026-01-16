// 'use client';

// import React, { useEffect, useState } from 'react';
// import { Button } from '../ui/button';
// import { sos } from '@/app/actions/sos';
// import { toast } from 'sonner';

// const SOS = () => {
//   const [coordinates, setCoordinates] = useState({
//     latitude: null,
//     longitude: null,
//   });
//   const [error, setError] = useState('');

//   useEffect(() => {
//     // Function to get user coordinates
//     const getUserCoordinates = () => {
//       if (!navigator.geolocation) {
//         setError('Geolocation is not supported by your browser');
//         return;
//       }

//       const success = (position: any) => {
//         const { latitude, longitude } = position.coords;
//         setCoordinates({ latitude, longitude });
//       };

//       const error = (err: any) => {
//         setError(`Error retrieving location: ${err.message}`);
//       };

//       navigator.geolocation.getCurrentPosition(success, error);
//     };

//     getUserCoordinates();
//   }, []); // Empty dependency array ensures useEffect runs only once

//   const handleSOS = async () => {
//     const response = await sos([coordinates?.latitude, coordinates?.longitude]);
//     if (response) {
//       toast.success('SOS TRIGGERED');
//     }
//   };

//   return (
//     <Button variant={'destructive'} onClick={handleSOS}>
//       SOS
//     </Button>
//   );
// };

// export default SOS;



'use client';

import React from 'react';
import { Button } from '../ui/button';
import { sos } from '@/app/actions/sos';
import { toast } from 'sonner';

const SOS = () => {
  const handleSOS = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported on this device');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        const response = await sos([latitude, longitude]);
        if (response) {
          toast.success('SOS TRIGGERED');
          // window.location.reload(); // 🔥 force map to refetch data
        }
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          toast.error('Please allow location access to trigger SOS');
        } else if (err.code === err.TIMEOUT) {
          toast.error('Location request timed out. Try again.');
        } else {
          toast.error('Unable to fetch location');
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  };

  return (
    <Button variant={'destructive'} onClick={handleSOS}>
      SOS
    </Button>
  );
};

export default SOS;

