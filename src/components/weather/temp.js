import { useEffect, useState } from "react";
import React from "react";
import "./style.css";
import WeatherCard from "./weatherCard";
const Temp = () => {
  const [searchValue, setSearchValue] = useState("hyderabad");

  const [tempInfo,setTempInfo]=useState({});
  
  const getWeatherInfo = async () => {
    try {
        // console.log(searchValue);
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=4f0213d37c2bca827cfba096b9d2f90d`;

      const res= await fetch(url);
        const data =await res.json();
        const {temp,pressure,humidity}=data.main;
        // console.log(temp + ","+pressure)
        const {main:weatherMood}=data.weather[0];
        // console.log(weatherMood);
        const {name}=data;
        const {speed} =data.wind;
        const {country,sunset}=data.sys;
        const myNewWeatherInfo={
            temp,pressure,humidity,weatherMood,name,speed,country,sunset,
        };
        setTempInfo(myNewWeatherInfo);
    } catch (error) {
        console.log(error)
    }
  };

  useEffect(() => {
    getWeatherInfo();
  }, []);

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            className="searchTerm"
            placeholder="search"
            place
            holder="search..."
            id="search"
            autoFocus
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}
            
          >
            Search
          </button>
        </div>
      </div>
      <WeatherCard tempInfo={tempInfo}/>
    </>
  );
};

export default Temp;
