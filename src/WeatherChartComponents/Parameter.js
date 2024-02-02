import React from "react";

const Parameter = ({setSelectedUnit, selectedParameter, setSelectedParameter}) => {

  const getUnitForParameter = (parameter) => {
    switch (parameter) {
      case "temperature":
        return "Celsius";
      case "humidity":
        return "%";
      case "windspeed":
        return "m/s";
      default:
        return "";
    }
  };

  const setUnitForParameter = (parameter) => {
    const unit = getUnitForParameter(parameter);
    setSelectedUnit(unit);
  };

  React.useEffect(() => {
    setUnitForParameter(selectedParameter);
  }, [selectedParameter]);

  return (
    <div className="selectContainer">
      <select
        id="parameterSelect"
        onChange={(e) => setSelectedParameter(e.target.value)}
        value={selectedParameter}
        className="select"
      >
        <option value="temperature">Temperature</option>
        <option value="humidity">Humidity</option>
        <option value="windspeed">Wind Speed</option>
      </select>
    </div>
  );
};

export default Parameter;
