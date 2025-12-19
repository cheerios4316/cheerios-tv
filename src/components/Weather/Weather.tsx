"use client";

import { FC, useEffect, useState } from "react";
import styles from "./Weather.module.scss";
import { fetchWeather } from "@/actions/fetch-weather";
import { IWeatherResponse } from "@/interface/api";
import { getWeatherIcon, WMO_WEATHER_MAP } from "@/helpers/weather";

interface IWeatherProps {
  latitude: number;
  longitude: number;
}

const FIFTEEN_MINUTES = 10 * 60 * 1000;

const Weather: FC<IWeatherProps> = ({ latitude, longitude }) => {
  const [weatherData, setWeatherData] = useState<IWeatherResponse | null>(null);

  const getWeather = async () => {
    const data = await fetchWeather(latitude, longitude);

    console.log(data);

    setWeatherData(data);
  };

  useEffect(() => {
    const refreshWeather = setInterval(getWeather, FIFTEEN_MINUTES);

    getWeather();

    return () => clearInterval(refreshWeather);
  }, []);

  const onClick = async () => {
    setWeatherData(null);
    await getWeather();
  };

  if (!weatherData) {
    return null;
  }

  const displayData = getWeatherIcon(
    weatherData.weatherCodeWmo,
    weatherData.isDay
  );
  const Icon = displayData.icon;

  return (
    <div className={styles["container"]}>
      <div className={styles["weather"]} onClick={onClick}>
        <div className={styles["weather__icon-temp"]}>
          <span className={styles["weather__temp"]}>
            {weatherData.temperatureCelsius.value}
            <span className={styles["red"]}>°C</span>
          </span>
        </div>
        <span className={styles["weather__description"]}>
          {" "}
          <Icon strokeWidth={2} />
          {displayData.description}
        </span>
      </div>
      <span className={styles["hint"]}>Click to refresh</span>
    </div>
  );
};

export { Weather, type IWeatherProps };
