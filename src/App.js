import React from 'react';
import Weather from "./Weather";

import './App.css';

export default function App() {
  return (
    <div className="App">
      <div className="container">
      <Weather defaultCity="London" />
      <footer class="text-center">
        This project was coded by Alexa Cacchiola and is {" "}
      <a href="https://github.com/codergirlshecodes/react-weather-app-restructured" 
      target="_blank" 
      rel="noreferrer"> open-sourced on GitHub
      </a>
    </footer>
    </div>
    </div>
  );
}
