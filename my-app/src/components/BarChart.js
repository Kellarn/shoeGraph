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
  const { chartData } = useContext(ChartsDataContext);
  const [manipulatedChartData, setManinpulatedChartData] = useState([]);
  console.log('Barchart -> chartData', chartData);
  //   const sizes = Object.keys(chartData.sizes).map(function(key) {
  //     return { size:, amount: chartData.sizes[key] };
  //   });
  // for (const sizes in chartData.sizes) {
  //   console.log(`${sizes}`);
  //   for (const values in sizes) {
  //     console.log(`${values.value}: ${sizes[values]}`);
  //   }
  // }
  useEffect(() => {
    for (let [key, value] of Object.entries(chartData.sizes)) {
      let sizeObject = { size: key };
      console.log(key, value);
      for (let [key2, value2] of Object.entries(value)) {
        console.log(key2, value2);
        sizeObject[key2] = value2;
      }
      console.log(sizeObject);
      setManinpulatedChartData(manipulatedChartData => [
        ...manipulatedChartData,
        sizeObject
      ]);
    }
    return () => {
      console.log(manipulatedChartData);
    };
  }, [chartData]);
  // Object.values(chartData.sizes).forEach(value => console.log(key, value));
  console.log(manipulatedChartData);

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <BarChart
        height={600}
        data={manipulatedChartData && manipulatedChartData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <XAxis dataKey='size' />
        <YAxis />
        <CartesianGrid strokeDasharray='' />
        <Tooltip />
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
