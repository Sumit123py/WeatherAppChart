import React from 'react';

const WeatherInformation = ({ data }) => (
  <div className="temperatureInfo">
    <h2 className="currentTemperature">
      {data.length !== 0 ? (data.main.temp - 273.15).toFixed(1) : ""} °c
    </h2>
    <h3 className="currentPlace">{data.length !== 0 ? data.name : ""}</h3>
  </div>
);

export default WeatherInformation;
