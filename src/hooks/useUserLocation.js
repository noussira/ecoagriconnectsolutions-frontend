
import { useState, useEffect } from 'react';
import { useGeolocation } from './useGeolocation';
import { useReverseGeocoding } from './useReverseGeocoding';

export const useUserLocation = () => {
  const { location: coords, loading: geoLoading, error: geoError } = useGeolocation();
  const { address, loading: addressLoading, error: addressError } = useReverseGeocoding(
    coords?.latitude, 
    coords?.longitude
  );

  const [permissionAsked, setPermissionAsked] = useState(false);

  useEffect(() => {
    if (geoError || coords) {
      setPermissionAsked(true);
    }
  }, [geoError, coords]);

  return {
    coordinates: coords,
    address,
    loading: geoLoading || addressLoading,
    error: geoError || addressError,
    hasPreciseLocation: !!(coords && address),
    permissionAsked,
    permissionGranted: !!coords,
    permissionDenied: !!geoError && geoError.includes('refusée')
  };
};