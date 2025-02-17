import React, { useContext, useState, useEffect } from 'react';
import ChartsDataContext from './ChartsDataContext';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

const Barchart = () => {
  const { chosenDataSet } = useContext(ChartsDataContext);
  const [manipulatedChartData, setManinpulatedChartData] = useState([]);

  useEffect(() => {
    setManinpulatedChartData([]);
    for (let [outerKey, outerValue] of Object.entries(chosenDataSet.sizes)) {
      let sizeObject = { size: outerKey };
      for (let [innerKey, innerValue] of Object.entries(outerValue)) {
        sizeObject[innerKey] = innerValue;
      }
      setManinpulatedChartData(manipulatedChartData => [
        ...manipulatedChartData,
        sizeObject
      ]);
    }
  }, [chosenDataSet]);

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <BarChart
        height={600}
        data={manipulatedChartData && manipulatedChartData}
        margin={{
          top: 40,
          right: 40,
          left: 40,
          bottom: 5
        }}
      >
        <XAxis dataKey='size' />
        <YAxis />
        <CartesianGrid strokeDasharray='3 3' />
        <Tooltip fill='#356B92' />
        <Legend />
        <Bar dataKey='A' stackId='a' fill='#356B92' />
        <Bar dataKey='B' stackId='a' fill='#78CDCF' />
        <Bar dataKey='C' stackId='a' fill='#40C8DE' />
        <Bar dataKey='D' stackId='a' fill='#FF858C' />
        <Bar dataKey='E' stackId='a' fill='#B2D1E5' />
        <Bar dataKey='2A' stackId='a' fill='#7495A9' />
        <Bar dataKey='2E' stackId='a' fill='##131732' />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Barchart;
