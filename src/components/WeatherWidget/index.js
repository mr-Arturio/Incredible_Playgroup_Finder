"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const WeatherWidget = () => {
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
        console.log("Fetched weather data:", data);

        // Group forecast data by date, choosing an entry near midday
        const dailyForecast = {};
        data.list.forEach((item) => {
          const date = new Date(item.dt * 1000).toISOString().split("T")[0];
          const hour = new Date(item.dt * 1000).getHours();
          // Use a range between 11:00 and 15:00 to capture a near-noon entry
          if (hour >= 11 && hour <= 15) {
            dailyForecast[date] = item;
          }
        });
        console.log("Daily forecast (grouped by near-noon snapshot):", dailyForecast);

        // Convert to an array (today + next 7 days)
        const forecastArray = Object.values(dailyForecast).slice(0, 8);
        console.log("Forecast array (first 8 days):", forecastArray);

        setForecast(forecastArray);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching weather data:", err);
        setLoading(false);
      });
  }, [city, API_KEY]);

  const kelvinToCelsius = (tempK) => (tempK - 273.15).toFixed(0);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex overflow-auto bg-white border">
      {forecast.map((day, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center p-3 m-2 border rounded shadow-sm min-w-[100px]"
        >
          <p className="text-xs font-medium">
            {new Date(day.dt * 1000).toLocaleDateString(undefined, {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </p>
          <div className="relative h-10 w-10">
            <Image
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt={day.weather[0].description}
              fill
              sizes="(max-width: 768px) 50px, 100px"
            />
          </div>
          <p className="text-md font-semibold">
            {kelvinToCelsius(day.main.temp)}°C
          </p>
        </div>
      ))}
    </div>
  );
};

export default WeatherWidget;
