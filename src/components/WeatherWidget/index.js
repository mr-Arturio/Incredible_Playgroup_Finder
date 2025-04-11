"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { FiDroplet } from "react-icons/fi";
import { MdAir } from "react-icons/md";
import Tooltip from "@/utils/Tooltip";

export default function WeatherWidget() {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;
  const city = "Ottawa";

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        const dailyForecast = {};
        data.list.forEach((item) => {
          const dateStr = new Date(item.dt * 1000).toISOString().split("T")[0];
          const hour = new Date(item.dt * 1000).getHours();
          //  range between 11:00 and 15:00 for near-noon snapshot
          if (hour >= 11 && hour <= 15) {
            dailyForecast[dateStr] = item;
          }
        });
        const forecastArray = Object.values(dailyForecast).slice(0, 8);
        setForecast(forecastArray);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching weather data:", err);
        setLoading(false);
      });
  }, [API_KEY, city]);

  const kelvinToCelsius = (tempK) => (tempK - 273.15).toFixed(0);
  const toKmh = (mps) => (mps * 3.6).toFixed(1);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex justify-center gap-4 xl:gap-10 py-2 px-5 border-b bg-cardBody shadow">
      {forecast.map((day, index) => {
        const temp = kelvinToCelsius(day.main.temp);
        const feelsLike = kelvinToCelsius(day.main.feels_like);
        const tempMin = kelvinToCelsius(day.main.temp_min);
        const tempMax = kelvinToCelsius(day.main.temp_max);
        const humidity = day.main.humidity;
        const wind = toKmh(day.wind.speed);
        const dayLabel =
          index === 0 ? "Today" : format(new Date(day.dt * 1000), "EEE");

        if (index === 0) {
          // today card with extra info
          return (
            <div
              key={index}
              className="rounded-md border border-blue-200 bg-cardFooter shadow-md px-1 xl:px-2 max-w-xs w-full flex items-center space-x-4"
            >
              {/* Left Section */}
              <div className="flex-1 flex flex-col items-center">
                <div className="relative h-8 w-8">
                  <Image
                    src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                    alt={day.weather[0].description}
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="text-xs/3">{dayLabel}</p>
              </div>

              {/* Divider */}
              <div className="transform -translate-x-1/2 h-10 w-px bg-gray-200"></div>

              {/* Temperature and Feels Like */}
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold">{temp}°</span>
                <span className="text-xxs text-gray-600">
                  Feels like {feelsLike}°
                </span>
              </div>

              <div className="flex flex-1 items-center justify-start gap-4">
                {/* Humidity */}
                <div className="flex flex-col items-center text-gray-700">
                  <Tooltip text="Humidity">
                    <FiDroplet className="h-5 w-5 pt-1" />
                  </Tooltip>
                  <span className="text-xs pt-1">{humidity}%</span>
                </div>

                {/* Wind */}
                <div className="flex flex-col items-center text-gray-700">
                  <Tooltip text="Wind speed (km/h)">
                    <MdAir className="h-5 w-5 pt-1" />
                  </Tooltip>
                  <span className="text-xs pt-1">{wind}</span>
                </div>

                {/* Min/Max Temperature */}
                <div className="flex flex-col items-center text-gray-700 pr-1">
                  <div className="flex items-center gap-1">
                    <span className="text-blue-600">↓</span>
                    <span className="text-xs">{tempMin}°</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-red-600">↑</span>
                    <span className="text-xs">{tempMax}°</span>
                  </div>
                </div>
              </div>
            </div>
          );
        } else {
          // weekday cards
          return (
            <div
              key={index}
              className="rounded-md border border-blue-200 bg-cardFooter shadow-md w-[158px]  xl:w-[240px] py-1"
            >
              <section className="relative flex items-center px-1">
                <div className="flex-1 flex flex-col items-center">
                  <div className="relative h-8 w-8">
                    <Image
                      src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                      alt={day.weather[0].description}
                      fill
                    />
                  </div>
                  <p className="text-xs/3">{dayLabel}</p>
                </div>
                {/* Divider */}
                <div className="md:hidden lg:flex absolute left-1/2 transform -translate-x-1/2 h-10 w-px bg-gray-200"></div>
                <div className="flex-1 flex flex-col items-center">
                  <span className="text-2xl font-semibold">{temp}°</span>
                  <p className="text-xxs text-gray-600 leading-tight">
                    Feels like {feelsLike}°
                  </p>
                </div>
              </section>
            </div>
          );
        }
      })}
    </div>
  );
}
