// 
import { useState, useEffect } from 'react';

export const useGeolocation = (options = {}) => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('La géolocalisation n\'est pas supportée par votre navigateur');
      setLoading(false);
      return;
    }

    const getLocation = () => {
      navigator.geolocation.getCurrentPosition(
        // Succès
        (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          setLocation({
            latitude,
            longitude,
            accuracy,
            timestamp: position.timestamp
          });
          setLoading(false);
        },
        // Erreur
        (error) => {
          let errorMessage = 'Impossible de récupérer la localisation';
          
          switch(error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Permission de localisation refusée';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Information de localisation indisponible';
              break;
            case error.TIMEOUT:
              errorMessage = 'La requête de localisation a expiré';
              break;
          }
          
          setError(errorMessage);
          setLoading(false);
        },
        // Options
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 600000, 
          ...options
        }
      );
    };

    getLocation();
  }, []);

  return { location, loading, error };
};