import axios from "axios";
import { useState } from "react";
import { KeyboardEvent } from 'react';
import { FiWind } from 'react-icons/fi';
import { BiSolidMapPin } from 'react-icons/bi';
import { BsFillDropletFill } from 'react-icons/bs';

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
  };
  name: string;
  weather: {
    description: string;
  }[];
  wind: {
    speed: number;
  };
}

export default function App() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=fc0057caf13438a8c687380b74d30816&lang=pt_br`;

  const handleLocationInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  const handleLocationSearch = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (location.trim() !== '') {
        axios.get(url).then((response) => {
          setData(response.data);
          console.log(response.data);
        });
        setLocation('');
      }
    }
  };

  return (
    <main style={{ backgroundImage: "url('src/assets/bg.jpg')", backgroundSize: "cover", backgroundPosition: "center", backgroundColor: "black" }}>
      <div className="h-screen flex flex-col items-center justify-center">
        <h1 className="text-teal-700 font-bold font-inter text-6xl tracking-wide drop-shadow-md">ClimaTempo</h1>

        <div className="bg-bg mt-10 rounded-md shadow-2xl p-12">
          <div className="flex flex-col items-center space-y-4 ">
            <input className="rounded-md w-80 h-9 pl-2 pr-2 mt-2 focus:outline-none" placeholder="Digite a localização" value={location} onChange={handleLocationInput} onKeyDown={handleLocationSearch}></input>

            <div>
              <h1 className="text-teal-700 font-bold font-inter text-2xl drop-shadow-md">
                {data ? (
                  <p className="flex items-center">
                    <BiSolidMapPin className="mr-1" />
                    {data.name}
                  </p>
                ) : location.trim() === '' ? (
                  <p>Por favor, digite uma localização</p>
                ) : (
                  <p>Carregando...</p>
                )}
              </h1>
            </div>
            <div>
              <h1 className="text-teal-700 font-bold font-inter text-ml drop-shadow-md">
                {data?.main ? <p className="bold">{data.main.temp}°C</p> : null}
              </h1>
            </div>
            <div className="text-center">
              <h1 className="text-teal-700 font-bold font-inter text-2xl drop-shadow-md">
                {data && data.weather ? <p>{data.weather[0].description}</p> : null}
              </h1>
            </div>
            <div className="flex flex-row pb-5 space-x-2 text-center">
              <h1 className="text-teal-700 font-bold font-inter text-2xl drop-shadow-md">
                {data?.main ? (
                  <p className="flex items-center drop-shadow-md">
                    <BsFillDropletFill className="mr-2" />
                    {data.main.humidity}%
                  </p>
                ) : null}
              </h1>
              <h1 className="text-teal-700 font-bold font-inter text-2xl drop-shadow-md">
                {data?.main ? <p>|</p> : null}
              </h1>
              <h1 className="text-teal-700 font-bold font-inter text-2xl drop-shadow-md">
                {data?.wind ? (
                  <p className="flex items-center drop-shadow-md">
                    <FiWind className="mr-2" />
                    {data.wind.speed}km/h
                  </p>
                ) : null}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
