"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { format } from "date-fns";

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
        // Group forecast data by date, picking an entry near midday
        const dailyForecast = {};
        data.list.forEach((item) => {
          const dateStr = new Date(item.dt * 1000).toISOString().split("T")[0];
          const hour = new Date(item.dt * 1000).getHours();
          // Use a range between 11:00 and 15:00 for near-noon snapshot
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

  // Kelvin-to-Celsius helper
  const kelvinToCelsius = (tempK) => (tempK - 273.15).toFixed(0);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-wrap gap-4 p-4 border-b bg-white">
      {forecast.map((day, index) => {
        const temp = kelvinToCelsius(day.main.temp);
        const feelsLike = kelvinToCelsius(day.main.feels_like);
        // const tempMin = kelvinToCelsius(day.main.temp_min);
        // const tempMax = kelvinToCelsius(day.main.temp_max);

        // const numericDate = format(new Date(day.dt * 1000), "dd.MM");
        const dayOfWeek = format(new Date(day.dt * 1000), "EEE");

        return (
          <div
            key={index}
            className="rounded-md border-2 bg-blue-50 shadow-md w-[160px] py-1"
          >
            <section className="relative flex items-center px-1">
              {/* Left Part: Weather Icon and Date */}
              <div className="flex-1 flex flex-col items-center">
                <div className="relative h-10 w-10">
                  <Image
                    src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                    alt={day.weather[0].description}
                    fill
                  />
                </div>
                <p className="text-xs">{dayOfWeek}</p>
              </div>

              {/* Vertical Divider (absolutely positioned) */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-10 w-px bg-gray-200"></div>

              {/* Right Part: Temperature Info */}
              <div className="flex-1 flex flex-col items-center">
                <span className="text-3xl font-semibold">{temp}°</span>
                <p className="text-xxs text-gray-600 leading-tight">
                  Feels like {feelsLike}°
                </p>

              </div>
            </section>
          </div>
        );
      })}
    </div>
  );
}
