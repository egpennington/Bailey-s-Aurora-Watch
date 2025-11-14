import React from 'react';
import { AuroraForecast } from '../types';
import GaugeChart from './GaugeChart';

interface ForecastDisplayProps {
  forecast: AuroraForecast;
}

// Fix: Changed icon type from JSX.Element to React.ReactNode to resolve "Cannot find namespace 'JSX'" error.
const InfoCard: React.FC<{ title: string; value: string | number; unit: string; icon: React.ReactNode }> = ({ title, value, unit, icon }) => (
  <div className="bg-gray-800/50 p-4 rounded-lg flex items-center space-x-4 border border-gray-700">
    <div className="text-teal-400">{icon}</div>
    <div>
      <p className="text-sm text-gray-400">{title}</p>
      <p className="text-xl font-bold">
        {value}
        <span className="text-base font-normal text-gray-400 ml-1">{unit}</span>
      </p>
    </div>
  </div>
);

const ForecastDisplay: React.FC<ForecastDisplayProps> = ({ forecast }) => {
  return (
    <div className="w-full bg-white/10 p-6 rounded-2xl shadow-lg border border-white/20 backdrop-blur-md animate-fade-in">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="w-full md:w-1/2 flex justify-center">
          <GaugeChart value={forecast.viewingProbability} />
        </div>
        <div className="w-full md:w-1/2 space-y-4">
          <InfoCard 
            title="KP Index" 
            value={forecast.kpIndex} 
            unit="(Geomagnetic Activity)"
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
          />
          <InfoCard 
            title="Cloud Cover" 
            value={forecast.cloudCover} 
            unit="%"
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>}
          />
        </div>
      </div>
      <div className="mt-6 pt-6 border-t border-gray-700">
        <h3 className="text-lg font-semibold text-teal-300 mb-2">Summary</h3>
        <p className="text-gray-300">{forecast.summary}</p>
      </div>
    </div>
  );
};

export default ForecastDisplay;
