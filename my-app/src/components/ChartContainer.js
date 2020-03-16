import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChartsDataContext from './ChartsDataContext';
import BarChart from './BarChart';
import './charts.css';

const ChartContainer = () => {
  const [chartData, setChartData] = useState({
    gender: null,
    sizes: null,
    system: null
  });
  useEffect(chartData => {
    const fetchData = async () => {
      let sampleRes = await axios({
        method: 'get',
        url: 'https://homeexercise.volumental.com/sizingsample',
        headers: {
          Authorization:
            'Basic ' +
            btoa(
              process.env.REACT_APP_USERNAME +
                ':' +
                process.env.REACT_APP_PASSWORD
            ),
          'Content-type': 'application/json'
        },
        mode: 'cors'
      });
      console.log(sampleRes.data.data[0]);
      const { data } = sampleRes.data;
      console.log('fetchData -> data', data[0]);
      setChartData({
        ...chartData,
        gender: data[0].gender,
        sizes: data[0].sizes,
        system: data[0].system
      });
    };
    fetchData();
  }, []);

  return (
    <ChartsDataContext.Provider value={{ chartData, setChartData }}>
      {chartData.system && <BarChart />}
    </ChartsDataContext.Provider>
  );
};
export default ChartContainer;
