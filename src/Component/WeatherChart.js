import React, { useEffect, useState } from "react";
import Loader from "../Loader";
import SearchContainer from "../WeatherChartComponentSections/SearchContainer";
import Parameter from "../WeatherChartComponentSections/Parameter";
import SelectDate from "../WeatherChartComponentSections/SelectDate";
import BarChartComponent from "../WeatherChartComponentSections/BarChartComponent";

const WeatherChart = ({ place, setPlace, setShowGraph, handleApiError, isOnline }) => {
  const [selectedParameter, setSelectedParameter] = useState("temperature");
  const [selectedUnit, setSelectedUnit] = useState("Celsius");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [uniqueDates, setUniqueDates] = useState(new Set());
  const [yAxisDomain, setYAxisDomain] = useState(null)
  

  let ApiKey = "5cf637ed8cf0beff1e32c33364f1644e";

  const fetchData = async (date) => {
    let fetchUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${ApiKey}&cnt=50`;

    try {
      const response = await fetch(fetchUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      const filteredData = date ? result.list.filter((item) => {
        const itemDate = new Date(item.dt_txt.split(' ')[0]).setHours(0, 0, 0, 0);
        const selectedDat = date ? new Date(date).setHours(0, 0, 0, 0) : null;
        return itemDate === selectedDat;
      }) : result.list;

      setData(filteredData);
      const maxTemperature = filteredData.reduce((max, item) => {
        const temperature = kelvinToCelsius(item.main.temp);
        return temperature > max ? temperature : max;
      }, -Infinity);
  
      setYAxisDomain([0, Math.ceil(maxTemperature) + 5]);

      const uniqueDatesSet = new Set(result.list.map((curelem) => new Date(curelem.dt_txt).toISOString().split('T')[0]));
      setUniqueDates(Array.from(uniqueDatesSet));
      setError("");
    } catch (error) {
      setData([]);
      setError("City not found. Please enter a valid city name.");
    } finally {
      setIsLoading(false);
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

    fetchData(selectedDate); 
    setIsLoading(true);

  }, [isOnline, place]);

  const handleData = (e) => {
    e.preventDefault()
    fetchData(selectedDate);
    setIsLoading(true);
  };

  const HandleInput = (e) => {
    let val = e.target.value;
    setPlace(val);
    setIsTyping(true)
    if (val === '') {
      setIsTyping(false)
    }
  };

  

  const kelvinToCelsius = (kelvin) => kelvin - 273.15;

  const chartData =
    data.length !== 0
      ? data.slice(0, 5).map((curelem) => ({
        name: new Date(curelem.dt_txt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        fullDate: curelem.dt_txt,
        date: new Date(curelem.dt_txt).toLocaleDateString(),
        temperature:
          selectedParameter === "temperature"
            ? kelvinToCelsius(curelem.main.temp).toFixed(1)
            : null,
        humidity:
          selectedParameter === "humidity" ? curelem.main.humidity : null,
        windspeed:
          selectedParameter === "windspeed" ? curelem.wind.speed : null,
      }))
      : "";

  return (
    <>
      <div className="weatherChartContainer">
        <div className="filterContainer">
          <p onClick={() => setShowGraph(false)} className="app">
            <i class="fa-solid fa-left-long"></i>
          </p>
          <Parameter
            setSelectedUnit={setSelectedUnit}
            selectedParameter={selectedParameter}
            setSelectedParameter={setSelectedParameter}
          />
          <SearchContainer
            setPlace={setPlace}
            handleData={handleData}
            setShowGraph={setShowGraph}
            HandleInput={HandleInput}
            setIsTyping={setIsTyping}
            setSelectedDate={setSelectedDate}
            data={data}
          />
        </div>
        {isLoading || isTyping ? (
          <Loader />
        ) : (
            <>
              {!error && data.length !== 0 ? (
                <BarChartComponent chartData={chartData} yAxisDomain={yAxisDomain} selectedParameter={selectedParameter} selectedUnit={selectedUnit}/>
              ) : (<div className="error">{isOnline && error && place !== '' ? error : handleApiError()}</div>)}
              <SelectDate data={data} setSelectedDate={setSelectedDate} fetchData={fetchData} uniqueDates={uniqueDates}/>
            </>
          )}
      </div>
    </>
  );
};

export default WeatherChart;
