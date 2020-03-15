import React, { useEffect } from 'react';
import axios from 'axios';

const ChartContainer = () => {
  useEffect(() => {
    const fetchData = async () => {
      let res = await axios({
        method: 'get',
        url: 'https://homeexercise.volumental.com',
        headers: {
          Authorization: 'Basic ' + btoa('admin' + ':' + 'ToPsEcReT'),
          'Content-type': 'application/json'
        },
        mode: 'cors'
      });
      console.log(res);
      let { Authorization } = res.config.headers.Authorization;

      let sampleRes = await axios({
        method: 'get',
        url: 'https://homeexercise.volumental.com/sizingsample',
        headers: {
          Authorization: 'Basic ' + btoa('admin' + ':' + 'ToPsEcReT'),
          'Content-type': 'application/json'
        },
        mode: 'cors'
      });
      console.log(sampleRes);
    };
    fetchData();
  }, []);

  return (
    <>
      <p>Hello</p>
    </>
  );
};
export default ChartContainer;
