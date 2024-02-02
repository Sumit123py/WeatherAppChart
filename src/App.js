import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Weather from "./Component/Weather";
import WeatherChart from "./Component/WeatherChart";

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [place, setPlace] = useState("");
  const [showGraph, setShowGraph] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);


  let ApiKey = "5cf637ed8cf0beff1e32c33364f1644e";

  const fetchData = useCallback(async () => {
    let fetchUrl = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${ApiKey}`;

    try {
      const response = await fetch(fetchUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
      setError("");
    } catch (error) {
      setData([]); // Clear previous data in case of error
      setError("City not found. Please enter a valid city name.");
    } finally {
      setIsLoading(false);
    }
  }, [place]);

  const HandleData = (e) => {
    e.preventDefault();
    fetchData();
    setIsLoading(true);
  };


  useEffect(() => {
    const handleOnlineStatusChange = () => {
      setIsOnline(navigator.onLine);

      if (navigator.onLine) {
        try {
          fetchData();
        } catch (error) {
          setError("An error occurred while fetching weather data.");
          setIsLoading(false);
        }
      }
    };

    setIsOnline(navigator.onLine);

    window.addEventListener("online", handleOnlineStatusChange);
    window.addEventListener("offline", handleOnlineStatusChange);

    return () => {
      window.removeEventListener("online", handleOnlineStatusChange);
      window.removeEventListener("offline", handleOnlineStatusChange);
    };
  }, [fetchData]);


  

  


  

  const handleApiError = () => {
    if (!isOnline) {
      return "No internet connection. Please check your network.";
    }

    else if (isOnline && error && error.response && error.response.status === 404) {
      // Handle 404 Not Found error
      return "Weather data not found for the specified location.";
    }

    else if(isOnline && error && place !== ''){
        return error
  
    }
    else if(isOnline && error && place === ''){
      return 'Please Enter a city name'

    }

    return "An error occurred while fetching weather data. Try to enter City name correctly";
  };


  
  


  return (
    <div className="App">
      <div style={{transform: `translateX(-${showGraph ? '100' : '0'}%)`}} className="slider">
        <div className="slide">
          <Weather
            data={data}
            setPlace={setPlace}
            HandleData={HandleData}
            error={error}
            isLoading={isLoading}
            setShowGraph={setShowGraph}
            showGraph={showGraph}
            isOnline={isOnline}
            handleApiError={handleApiError}
            setError={setError}
            place={place}
            fetchData={fetchData}
            setIsLoading={setIsLoading}
          />
        </div>
        <div className="slide">
          <WeatherChart
            data={data}
            setData={setData}
            setPlace={setPlace}
            HandleData={HandleData}
            setError={setError}
            setIsLoading={setIsLoading}
            place={place}
            isLoading={isLoading}
            setShowGraph={setShowGraph}
            showGraph={showGraph}
            isOnline={isOnline}
            handleApiError={handleApiError}
            error={error}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
