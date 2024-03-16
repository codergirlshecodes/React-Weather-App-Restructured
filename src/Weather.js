import React, { useState, useEffect } from "react";
import WeatherInfo from "./WeatherInfo";
import axios from "axios";
import "./Weather.css";

export default function Weather(props) {
    const [city, setCity] = useState(props.defaultCity);
    const [ready, setReady] = useState(false);
    const [weatherData, setWeatherData] = useState({});

    function handleResponse(response) {
        console.log(response.data);
        setWeatherData({
            temperature: response.data.main.temp,
            humidity: response.data.main.humidity,
            date: new Date(response.data.dt * 1000),
            description: response.data.weather[0].description,
            iconUrl: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
            wind: response.data.wind.speed,
            city: response.data.name,
        });
        setReady(true);
    }

    useEffect(() => {
        const apiKey = "6f578b96aa9505bcce148ac22cb85794";
        let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        axios.get(apiUrl)
            .then(response => handleResponse(response))
            .catch(error => console.error("Error fetching weather data:", error));
    }, [city]);

    function handleSubmit(event) {
        event.preventDefault();
        
        setCity(event.target.elements.city.value);
    }

    function handleCityChange(event) {
        setCity(event.target.value);
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
        </div>
    );
}
