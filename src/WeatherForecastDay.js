import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherIcon from "./WeatherIcon";

export default function WeatherForecast(props) {
  const [loaded, setLoaded] = useState(false);
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    let apiKey = "15b6ba0523386a8a73b38b2440a74dea";
    let lon = props.coordinates?.lon;
    let lat = props.coordinates?.lat;

    if (lon !== undefined && lat !== undefined) {
      let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

      axios.get(apiUrl).then(handleResponse);
    }
  }, [props.coordinates]);

  function handleResponse(response) {
    console.log(response.data);
    setForecast(response.data.daily);
    setLoaded(true);
  }

  if (loaded && forecast) {
    return (
      <div className="WeatherForecast">
        <div className="row">
          {forecast.map((day, index) => (
            <div className="col" key={index}>
              <div className="WeatherForecast-day">
                {new Date(day.dt * 1000).toLocaleString("en-US", {
                  weekday: "short",
                })}
              </div>
              <WeatherIcon code={day.weather[0].icon} size={36} />
              <div className="WeatherForecast-temperatures">
                <span className="WeatherForecast-temperature-max">
                  {Math.round(day.temp.max)}°
                </span>
                <span className="WeatherForecast-temperature-min">
                  {Math.round(day.temp.min)}°
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return null;
  }
}
