
import React, { useState, useCallback } from 'react';
import { AuroraForecast } from './types';
import { getAuroraForecast } from './services/geminiService';
import LocationInput from './components/LocationInput';
import ForecastDisplay from './components/ForecastDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';

const App: React.FC = () => {
  const [forecast, setForecast] = useState<AuroraForecast | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleForecastRequest = useCallback(async (latitude: number, longitude: number) => {
    setIsLoading(true);
    setError(null);
    setForecast(null);
    try {
      const data = await getAuroraForecast(latitude, longitude);
      setForecast(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(`Failed to fetch forecast. ${err.message}. Please try again.`);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const WelcomeMessage: React.FC = () => (
    <div className="text-center p-8 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 shadow-lg">
      <h2 className="text-2xl font-bold text-teal-300 mb-2">Welcome to Aurora Watch</h2>
      <p className="text-gray-300">Enter your coordinates or use your current location to get the Northern Lights viewing forecast.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans flex flex-col items-center p-4 selection:bg-teal-500 selection:text-white">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 opacity-20" 
        style={{backgroundImage: `url('https://picsum.photos/seed/aurora/1920/1080')`}}>
      </div>
      <main className="w-full max-w-2xl mx-auto flex flex-col items-center z-10 space-y-8 flex-grow justify-center">
        <header className="text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-teal-300 to-purple-400">
            Aurora Watch
          </h1>
          <p className="text-gray-400 mt-2 text-lg">Your personal Northern Lights forecast.</p>
        </header>

        <LocationInput onForecastRequest={handleForecastRequest} isLoading={isLoading} />
        
        <div className="w-full min-h-[300px] flex items-center justify-center">
          {isLoading && <LoadingSpinner />}
          {error && <ErrorMessage message={error} />}
          {forecast && <ForecastDisplay forecast={forecast} />}
          {!isLoading && !error && !forecast && <WelcomeMessage />}
        </div>
      </main>
      <footer className="text-center text-gray-500 text-sm p-4 z-10">
        <p>Powered by Gemini. Location data is not stored.</p>
      </footer>
    </div>
  );
};

export default App;
