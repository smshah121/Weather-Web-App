import React, { useState } from 'react'
import { IoMdSearch } from "react-icons/io";
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa";
import axios from 'axios';


const App = () => {
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [cityName, setCityName] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("01d");
  VITE_OPENWEATHERMAP_API_KEY="cf9a456c17fc35b79228a8bd9efe5604";
  const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
  const fetchWeather = async ()=>{
    try {
      const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${API_KEY}`)
      if(data.cod){
        setTemperature(data.main.temp);
        setHumidity(data.main.humidity);
        setWindSpeed(data.wind.speed);
        setCityName(data.name);
        setWeatherIcon(data.weather[0].icon);

      }

    } catch (error) {
      console.log(error);
      setCityName("city not found");
      setTemperature(null);
      setHumidity(null);
      setWindSpeed(null);
      setWeatherIcon("01d");

      
    }
    setLoading(false);
  }
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gradient-to-br from-purple-800 to-slate-700 text-white'>
      <div className='flex items-center bg-white rounded-full px-3 py-2 w-50 mb-5 shadow-lg'>
        <input type="text"
        placeholder='Search' 
        value={search}
        onChange={(e)=> setSearch(e.target.value)}
        className='flex-1 text-black outline-none px-2'/>
        <IoMdSearch
       onClick={fetchWeather}
        className='text-gray-700 cursor-pointer'/>
      </div>
      <img src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`} alt="" className='w-20 h-20 mb-2'/>
      <h1 className='text-4xl font-bold mb-2'>
        {loading 
        ? "loading..."
        :temperature!=null
        ?`${temperature}°C`
        :"__"}</h1>
      <h2 className='text-2xl font-semibold'>
        {cityName || "Enter a City Name"}
        </h2>
      <div className='w-80 flex items-center justify-between mt-5'>
        <div className='flex flex-col items-center'>
          <WiHumidity className='text-2xl mb-1'/>
          <span className='text-lg'>
          {humidity !== null ? `${humidity}%` : "--"}
          </span>
          <p className='text-sm'>Humidity</p>
        </div>
        <div className='flex flex-col items-center'>
          <FaWind className='text-2xl mb-1'/>
          <span className='text-lg'>
          {windSpeed !== null ? `${windSpeed}km/h` : "--"}
          </span>
          <p className='text-sm'>wind speed</p>
        </div>
      </div>
    </div>
  )
}

export default App