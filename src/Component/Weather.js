import React, { useEffect, useState } from "react";
import Loader from "../Loader";
import SearchContainer from "../WeatherComponentSections/SearchContainer";
import WeatherInformation from "../WeatherComponentSections/WeatherInformation";
import Humidity from "../WeatherComponentSections/Humidity";
import Wind from "../WeatherComponentSections/Wind";
import WeatherImage from "../WeatherComponentSections/WeatherImage";

const Weather = ({ data, setPlace, HandleData, error, isLoading, setShowGraph, handleApiError, isOnline, setError, place, fetchData, setIsLoading }) => {
  const [isTyping, setIsTyping] = useState(false);

  const HandleInput = (e) => {
    let val = e.target.value;
    setPlace(val);
    setIsTyping(true);
    if(val === ''){
      setIsTyping(false);
    }
  };

  useEffect(() => {
    if (!isOnline) {
      setError("No internet connection. Please check your network.");
    } else if (place === '') {
      setError('Please Enter a city name');
    } else {
      setError('An error occurred while fetching weather data. Try to enter City name correctly');
    }

    fetchData();
    setIsLoading(true);

  }, [isOnline]);

  return (
    <>
      <div className="container">
        <SearchContainer HandleInput={HandleInput} HandleData={HandleData} setShowGraph={setShowGraph} setIsTyping={setIsTyping}/>
        {(!isOnline && error) ? (
          <div className="error">{handleApiError()}</div>
        ) : (
          isLoading || isTyping ? (
            <Loader />
          ) : (
            <>
              {!error && data.length !== 0 ? (
                <>
                  <WeatherImage data={data}/>
                  <WeatherInformation data={data}/>
                  <div className="extraWeatherInformation">
                    <Humidity data={data}/>
                    <Wind data={data}/>
                  </div>
                </>
              ) : (
                <div className="error">{handleApiError()}</div>
              )}
            </>
          )
        )}
      </div>
    </>
  );
};


export default Weather;
