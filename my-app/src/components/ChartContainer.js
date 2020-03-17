import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChartsDataContext from './ChartsDataContext';
import BarChart from './BarChart';
import './charts.css';

const ChartContainer = () => {
  const [chartData, setChartData] = useState([]);
  const [error, setError] = useState(false);

  useEffect((chartData, error) => {
    const fetchData = async (nextPage = '') => {
      try {
        let sampleRes = await axios({
          method: 'get',
          url: `http://homeexercise.volumental.com/sizingsample${nextPage}`,
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
        if (error) {
          setError(false);
        }
        console.log(sampleRes);
        const { data, 'next-page': nextPage2 } = sampleRes.data;
        console.log('fetchData -> data', data[0]);
        const chartDataObject = {
          [data[0].gender]: data[0].system,
          sizes: data[0].sizes
        };
        setChartData(chartData => [...chartData, chartDataObject]);
        if (nextPage2 !== undefined) {
          fetchData(`?page=${nextPage2}`);
        }
      } catch (error) {
        // Error
        if (error.response) {
          /*
           * The request was made and the server responded with a
           * status code that falls out of the range of 2xx
           */
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          /*
           * The request was made but no response was received, `error.request`
           * is an instance of XMLHttpRequest in the browser and an instance
           * of http.ClientRequest in Node.js
           */
          console.log(error.request);
        } else {
          // Something happened in setting up the request and triggered an Error
          console.log('Error', error.message);
        }
        console.log(error);
        setError(true);
      }
    };
    fetchData();
  }, []);
  console.log(chartData);
  return (
    <ChartsDataContext.Provider value={{ chartData, setChartData }}>
      {error && (
        <div className='error-wrapper'>
          <h2>Network error</h2>
          <p>Please check back later!</p>
        </div>
      )}
      {chartData[0] && <BarChart />}
    </ChartsDataContext.Provider>
  );
};
export default ChartContainer;
