
import React, { useState } from 'react';

interface LocationInputProps {
  onForecastRequest: (latitude: number, longitude: number) => void;
  isLoading: boolean;
}

const LocationInput: React.FC<LocationInputProps> = ({ onForecastRequest, isLoading }) => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }
    setError(null);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(4);
        const lon = position.coords.longitude.toFixed(4);
        setLatitude(lat);
        setLongitude(lon);
      },
      () => {
        setError('Unable to retrieve your location.');
      }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const latNum = parseFloat(latitude);
    const lonNum = parseFloat(longitude);
    
    if (isNaN(latNum) || isNaN(lonNum) || latNum < -90 || latNum > 90 || lonNum < -180 || lonNum > 180) {
      setError('Please enter valid latitude (-90 to 90) and longitude (-180 to 180).');
      return;
    }
    
    setError(null);
    onForecastRequest(latNum, lonNum);
  };

  return (
    <div className="w-full bg-white/10 p-6 rounded-2xl shadow-lg border border-white/20 backdrop-blur-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Latitude (e.g., 64.83)"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            disabled={isLoading}
            className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition duration-200 placeholder-gray-500"
          />
          <input
            type="text"
            placeholder="Longitude (e.g., -147.71)"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            disabled={isLoading}
            className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition duration-200 placeholder-gray-500"
          />
        </div>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={handleGeolocation}
            disabled={isLoading}
            className="flex-1 flex items-center justify-center gap-2 p-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            Use My Location
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 flex items-center justify-center gap-2 p-3 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
            Get Forecast
          </button>
        </div>
      </form>
    </div>
  );
};

export default LocationInput;
