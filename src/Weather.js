import React, {useState} from "react";
import Axios from "axios";
import "./Weather.css";

export default function Weather(props) {
    const [ready, setReady] = useState(false);
    const [weatherData, setweatherData] = useState({});
    function handleResponse(response) {
        console.log(response.data)
        setweatherData({
            temperature: response.data.main.temp,
            humidity: response.data.main.humidity,
            date: "Wednesday 07:00",
            description: response.data.weather[0].description, 
            iconUrl: "https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png",
            wind: response.data.wind.speed,
            city: response.data.name,
        })

        setReady(true);
    }

    if (ready) {
        return ( 
            <div className="Weather">
            <form>
                <div className="row">
                    <div className="col-md-9">
                        <input 
                            type="search" 
                            placeholder="Enter a city.." 
                            className="form-control"
                            autoFocus="on"
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
            <h1>{weatherData.city}</h1>
            <ul>
                <li>Wednesday 07:00</li>
                <li className="text-capitalize">
                    {weatherData.description}</li>
            </ul>
            <div className="row mt-3">
                <div className="col-md-6">
                    <div className="clearfix">
                    </div>
                    <img 
                        src={weatherData.iconUrl} 
                        alt={weatherData.description}
                        className="float-left" 
                    />
                    <span className="temperature">{Math.round(weatherData.temperature)}</span>
                    <span className="unit">°C</span>
                </div>
                <div className="col-md-6">
                    <ul>
                        <li>Precipitation: 15%</li>
                        <li>Humidity: {weatherData.humidity}%</li>
                        <li>Wind: {weatherData.wind} km/hr</li>
                    </ul>
                </div>
            </div>
        </div>
    );
} else {
    const apiKey = "6f578b96aa9505bcce148ac22cb85794";
    let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${props.defaultCity}&appid=${apiKey}&units=metric`

    Axios.get(apiUrl).then(handleResponse);

    return "Loading.."

    }

}