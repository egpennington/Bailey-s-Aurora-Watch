import React from 'react';
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts';

const GaugeChart = ({ value }) => {
  const getColor = (val) => {
    if (val > 66) return '#4ade80'; // green-400
    if (val > 33) return '#facc15'; // yellow-400
    return '#f87171'; // red-400
  };

  const color = getColor(value);
  const data = [{ name: 'Probability', value: value, fill: color }];

  return (
    <div className="w-48 h-48 sm:w-56 sm:h-56 relative">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          innerRadius="70%"
          outerRadius="100%"
          data={data}
          startAngle={180}
          endAngle={0}
          barSize={20}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar
            background={{ fill: '#374151' }} // gray-700
            dataKey="value"
            cornerRadius={10}
            angleAxisId={0}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl sm:text-5xl font-bold" style={{ color }}>
          {Math.round(value)}%
        </span>
        <span className="text-sm text-gray-400 mt-1">Viewing Chance</span>
      </div>
    </div>
  );
};

export default GaugeChart;