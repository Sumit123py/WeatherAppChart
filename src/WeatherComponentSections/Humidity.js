import React from 'react'

const Humidity = ({data}) => {
  return (
    <div className="humidity">
                    <p className="humidityIcon">
                      <i className="fa-solid fa-droplet"></i>
                    </p>
                    <div className="humidityInfo">
                      <p className="humidityAmount">
                        {data.length !== 0 ? data.main.humidity : ""}%
                      </p>
                      <p>Humidity</p>
                    </div>
                  </div>
  )
}

export default Humidity
