import React, { useState, useEffect } from "react";
import WeatherInfo from "./WeatherInfo";
import WeatherForecast from "./WeatherForecast";
import axios from "axios";
import "./Weather.css";

export default function Weather(props) {
    const [city, setCity] = useState(props.defaultCity);
    const [ready, setReady] = useState(false);
    const [weatherData, setWeatherData] = useState({});

    function handleResponse(response) {
        console.log(response.data);
        setWeatherData({
            coordinates: response.data.coord,
            temperature: response.data.main.temp,
            humidity: response.data.main.humidity,
            date: new Date(response.data.dt * 1000),
            description: response.data.weather[0].description,
            icon: response.data.weather[0].icon,
            wind: response.data.wind.speed,
            city: response.data.name,
        });
        setReady(true);
    }

    useEffect(() => {
        const apiKey = "15b6ba0523386a8a73b38b2440a74dea";
        let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        axios.get(apiUrl)
            .then(response => handleResponse(response))
            .catch(error => console.error("Error fetching weather data:", error));
    }, [city]);

    function handleSubmit(event) {
        event.preventDefault();
        setCity(event.target.elements.city.value);
    }

    return (
        <div className="Weather">
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-9">
                        <input
                            type="search"
                            placeholder="Enter a city.."
                            className="form-control"
                            autoFocus="on"
                            name="city"
                        />
                    </div>
                    <div className="col-md-3">
                        <input
                            type="submit"
                            value="Search"
                            className="btn btn-primary w-100"
                        />
                    </div>
                </div>
            </form>
            {ready ? <WeatherInfo data={weatherData} /> : "Loading..."}
            {ready && weatherData.coordinates ? <WeatherForecast coordinates={weatherData.coordinates} /> : null}
        </div>
    );
    }  

