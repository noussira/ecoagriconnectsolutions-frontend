
import { useState, useEffect } from 'react';

export const useReverseGeocoding = (latitude, longitude) => {
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!latitude || !longitude) return;

    const reverseGeocode = async () => {
      try {
        setLoading(true);
        setError(null);

       
        const response = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=fr`
        );

        if (!response.ok) throw new Error('Erreur de géocodage');

        const data = await response.json();
        
        setAddress({
          city: data.city || data.locality,
          region: data.principalSubdivision,
          country: data.countryName,
          countryCode: data.countryCode,
          continent: data.continent,
          postcode: data.postcode,
          latitude: data.latitude,
          longitude: data.longitude,
          fullAddress: data.locality || data.principalSubdivision
        });

      } catch (err) {
        setError(err.message);
        // Fallback vers OpenStreetMap
        await fallbackGeocoding(latitude, longitude);
      } finally {
        setLoading(false);
      }
    };

    const fallbackGeocoding = async (lat, lng) => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&accept-language=fr`
        );
        const data = await response.json();
        
        if (data && data.address) {
          setAddress({
            city: data.address.city || data.address.town || data.address.village,
            region: data.address.state || data.address.region,
            country: data.address.country,
            countryCode: data.address.country_code?.toUpperCase(),
            postcode: data.address.postcode,
            fullAddress: data.display_name
          });
        }
      } catch (fallbackError) {
        console.error('Fallback geocoding failed:', fallbackError);
      }
    };

    reverseGeocode();
  }, [latitude, longitude]);

  return { address, loading, error };
};