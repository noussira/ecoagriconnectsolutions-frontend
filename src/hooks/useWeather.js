
import { useState, useEffect } from 'react';
import { useUserLocation } from './useUserLocation';

export const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { 
    coordinates, 
    address, 
    loading: locationLoading, 
    error: locationError,
    hasPreciseLocation 
  } = useUserLocation();

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(null);

        // 
        if (locationLoading) return;

        let weatherUrl;
        
        // Priorité à la géolocalisation précise
        if (hasPreciseLocation && coordinates) {
          weatherUrl = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${coordinates.latitude},${coordinates.longitude}&lang=fr`;
        } else {
          // Fallback à la détection par IP
          weatherUrl = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=auto:ip&lang=fr`;
        }

        const response = await fetch(weatherUrl);

        if (!response.ok) throw new Error('API météo indisponible');

        const data = await response.json();

        const weatherData = {
          temperature: Math.round(data.current.temp_c),
          condition: getWeatherEmoji(data.current.condition.code),
          description: data.current.condition.text,
          city: address?.city || data.location.name,
          region: address?.region || data.location.region,
          country: address?.country || data.location.country,
          humidity: data.current.humidity,
          windSpeed: Math.round(data.current.wind_kph),
          feelsLike: Math.round(data.current.feelslike_c),
          coordinates: coordinates,
          isPreciseLocation: hasPreciseLocation,
          locationSource: hasPreciseLocation ? 'gps' : 'ip'
        };

        setWeather(weatherData);

      } catch (err) {
        console.error('Erreur météo:', err);
        setError(err.message);
        
        // Dernier fallback : données simulées
        setWeather({
          temperature: 28,
          condition: '☀️',
          description: "Ensoleillé",
          city: "Bamako",
          country: "Mali",
          humidity: 45,
          windSpeed: 12,
          feelsLike: 30,
          isPreciseLocation: false,
          locationSource: 'default'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [coordinates, address, locationLoading, hasPreciseLocation, API_KEY]);

  return { weather, loading, error };
};

// Fonction helper pour les emojis météo
const getWeatherEmoji = (conditionCode) => {
  const emojiMap = {
    1000: '☀️', 1003: '⛅', 1006: '☁️', 1009: '☁️', 1030: '🌫️',
    1063: '🌦️', 1066: '🌨️', 1069: '🌨️', 1072: '🌧️', 1087: '⛈️',
    1114: '🌨️', 1117: '❄️', 1135: '🌫️', 1147: '🌫️', 1150: '🌦️',
    1153: '🌦️', 1168: '🌧️', 1171: '🌧️', 1180: '🌦️', 1183: '🌧️',
    1186: '🌧️', 1189: '🌧️', 1192: '🌧️', 1195: '🌧️', 1198: '🌧️',
    1201: '🌧️', 1204: '🌨️', 1207: '🌨️', 1210: '🌨️', 1213: '🌨️',
    1216: '🌨️', 1219: '🌨️', 1222: '🌨️', 1225: '🌨️', 1237: '🌨️',
    1240: '🌦️', 1243: '🌧️', 1246: '🌧️', 1249: '🌨️', 1252: '🌨️',
    1255: '🌨️', 1258: '🌨️', 1261: '🌨️', 1264: '🌨️', 1273: '⛈️',
    1276: '⛈️', 1279: '⛈️', 1282: '⛈️'
  };
  
  return emojiMap[conditionCode] || '🌤️';
};