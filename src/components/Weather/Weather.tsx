"use client";

import { FC, useEffect, useState } from "react";
import styles from "./Weather.module.scss";
import { fetchWeather } from "@/actions/fetch-weather";
import { IWeatherResponse } from "@/interface/api";
import { getWeatherIcon } from "@/helpers/weather";
import {
  ArrowUp01,
  ArrowUpAz,
  ArrowUpCircle,
  ArrowUpFromDot,
  Loader2,
} from "lucide-react";

interface IWeatherProps {
  latitude: number;
  longitude: number;
}

const FIFTEEN_MINUTES = 10 * 60 * 1000;

const Weather: FC<IWeatherProps> = ({ latitude, longitude }) => {
  const [weatherData, setWeatherData] = useState<IWeatherResponse | null>(null);

  const getWeather = async () => {
    const data = await fetchWeather(latitude, longitude);

    setWeatherData(data);
  };

  useEffect(() => {
    const refreshWeather = setInterval(getWeather, FIFTEEN_MINUTES);

    getWeather();

    return () => clearInterval(refreshWeather);
  }, []);

  const onClick = async () => {
    setWeatherData(null);
    getWeather();
  };

  if (!weatherData) {
    return (
      <div className={styles["loader"]}>
        <Loader2 strokeWidth={2} />
      </div>
    );
  }

  const displayData = getWeatherIcon(
    weatherData.weatherCodeWmo,
    weatherData.isDay
  );
  const Icon = displayData.icon;

  return (
    <div className={styles["container"]}>
      <div className={styles["container__wind"]}>
        <div className="w-full flex justify-center">
          <ArrowUpFromDot size={24} style={{transform: `rotate(${weatherData.wind.directionDeg}deg)`}}/>
        </div>
        <div className={styles["container__wind__speed"]}>
          <span className={styles["container__wind__speed__value"]}>
            {weatherData.wind.speedKmh.value}
          </span>
          <span className={styles["container__wind__speed__unit"]}>km/h</span>
        </div>
      </div>
      <div className={styles["container-temp"]}>
        <div className={styles["weather"]} onClick={onClick}>
          <div className={styles["weather__icon-temp"]}>
            <span className={styles["weather__temp"]}>
              {weatherData.temperatureCelsius.value}
              <span className={styles["red"]}>°C</span>
            </span>
          </div>
          <span className={styles["weather__description"]}>
            <Icon strokeWidth={2} />
            {displayData.description}
          </span>
          <div className={styles["weather__separator"]}></div>
        </div>
        <span className={styles["hint"]}>Click to refresh</span>
      </div>
    </div>
  );
};

export { Weather, type IWeatherProps };
