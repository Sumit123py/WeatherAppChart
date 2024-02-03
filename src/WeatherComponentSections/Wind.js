import React from 'react'

const Wind = ({data}) => {
  return (
    <div className="windSpeed">
                    <p className="windDirectionIcon">
                      <i
                        style={{ transform: `rotate(${data.wind.deg}deg)` }}
                        className="fa-solid fa-location-arrow"
                      ></i>
                    </p>
                    <div className="windSpeedInfo">
                      <p className="currentWindSpeed">
                        {data.length !== 0 ? data.wind.speed : ""} m/s
                      </p>
                      <p>
                        <span>
                          <i className="fa-solid fa-wind"></i>
                        </span>{" "}
                        windSpeed
                      </p>
                    </div>
                  </div>
  )
}

export default Wind
