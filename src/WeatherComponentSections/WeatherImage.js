import React, { useEffect, useState } from "react";
import cloudClearImg from "../images/clear.png";
import cloudsImg from "../images/clouds.png";
import drizzleImg from "../images/drizzle.png";
import humidityImg from "../images/humidity.png";
import mistImg from "../images/mist.png";
import rainImg from "../images/rain.png";
import snowImg from "../images/snow.png";
import windImg from "../images/icons8-wind-100.png";
import thunderstormImg from "../images/icons8-thunderstorm-100.png";
import tornadoImg from "../images/icons8-tornado-100.png";
import squallImg from "../images/icons8-waterspout-100.png";
import dustImg from "../images/icons8-dust-100.png";
import ashImg from "../images/icons8-volcano-100.png";
import fogImg from "../images/icons8-fog-100.png";

const WeatherImage = ({ data }) => {
  const [weatherImage, setWeatherImage] = useState(null);
  const [weatherTitle, setWeatherTitle] = useState(null);

  useEffect(() => {
    if (data.length !== 0) {
      const weatherMain = data.weather[0].main;

      switch (weatherMain) {
        case "Clear":
          setWeatherImage(cloudClearImg);
          setWeatherTitle("cloudClear");
          break;
        case "Thunderstorm":
          setWeatherImage(thunderstormImg);
          setWeatherTitle("thunderstorm");
          break;
        case "Drizzle":
          setWeatherImage(drizzleImg);
          setWeatherTitle("drizzle");
          break;
        case "Rain":
          setWeatherImage(rainImg);
          setWeatherTitle("rain");
          break;
        case "Snow":
          setWeatherImage(snowImg);
          setWeatherTitle("snow");
          break;
        case "Mist":
        case "Smoke":
        case "Haze":
          setWeatherImage(mistImg);
          setWeatherTitle("mist");
          break;
        case "Dust":
        case "Sand":
          setWeatherImage(dustImg);
          setWeatherTitle("dust");
          break;
        case "Fog":
          setWeatherImage(fogImg);
          setWeatherTitle("fog");
          break;
        case "Tornado":
          setWeatherImage(tornadoImg);
          setWeatherTitle("tornado");
          break;
        case "Clouds":
          setWeatherImage(cloudsImg);
          setWeatherTitle("clouds");
          break;
        case "Squall":
          setWeatherImage(squallImg);
          setWeatherTitle("squall");
          break;
        case "Ash":
          setWeatherImage(ashImg);
          setWeatherTitle("ash");
          break;
        case "Windy":
          setWeatherImage(windImg);
          setWeatherTitle("wind");
          break;
        case "Humidity":
          setWeatherImage(humidityImg);
          setWeatherTitle("humidity");
          break;
        default:
          setWeatherImage(null);
      }
    }
  }, [data]);

  return (
    <>
      <div className="weatherImage">
        <img src={weatherImage} alt="" />
        <p>{weatherTitle}</p>
      </div>
    </>
  );
};

export default WeatherImage;
