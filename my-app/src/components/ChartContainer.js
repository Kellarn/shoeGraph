import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChartsDataContext from './ChartsDataContext';
import BarChart from './BarChart';
import cn from 'classnames';
import './charts.css';

const ChartContainer = () => {
  const [chartData, setChartData] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [chosenDataSet, setChosenDataSet] = useState({});

  useEffect((chartData, error) => {
    const fetchData = async (nextPage = '') => {
      setIsLoading(true);
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
        const { data, 'next-page': nextPageRes } = sampleRes.data;
        setChartData(chartData => [...chartData, data[0]]);
        if (nextPageRes !== undefined) {
          fetchData(`?page=${nextPageRes}`);
        }
        if (data[0] && nextPageRes === undefined) {
          setIsLoading(false);
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
        setError(true);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(
    chosenDataSet => {
      if (chosenDataSet !== chartData[0]) setChosenDataSet(chartData[0]);
    },
    [chartData]
  );

  return (
    <ChartsDataContext.Provider value={{ chosenDataSet, setChosenDataSet }}>
      {isLoading && <h1>Loading....</h1>}
      {!isLoading && error ? (
        <div className='error-wrapper'>
          <h2>Network error</h2>
          <p>Please check back later!</p>
        </div>
      ) : !isLoading && chartData[0] ? (
        <>
          <div className={'button-wrapper'}>
            {chartData.map(currentData => (
              <button
                key={`${currentData.gender}${currentData.system}`}
                className={cn(
                  `button ${currentData.gender} ${currentData.system}`,
                  {
                    active:
                      currentData.gender === chosenDataSet.gender &&
                      currentData.system === chosenDataSet.system
                  }
                )}
                onClick={() => setChosenDataSet(currentData)}
              >
                <span>{currentData.system + currentData.gender}</span>
              </button>
            ))}
          </div>
          <BarChart />
        </>
      ) : null}
    </ChartsDataContext.Provider>
  );
};
export default ChartContainer;
