import { IWeatherDtoOut, IWeatherResponse } from "@/interface/api";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const uri = process.env.WEATHER_API_URI ?? "";

  const queryParams = request.nextUrl.searchParams;
  const latitude = queryParams.get("latitude");
  const longitude = queryParams.get("longitude");

  if (!latitude || !longitude) {
    return new Response("Bad request", { status: 400 });
  }

  const urlParams = new URLSearchParams({
    latitude,
    longitude,
    current_weather: "true",
  });

  const endpoint = new URL(`${uri}/forecast?${urlParams}`).toString();

  const weatherResponse = await fetch(endpoint, { method: "GET" });

  const weatherData = (await weatherResponse.json()) as IWeatherDtoOut;

  if (!weatherResponse.ok) {
    return new Response("Server error", { status: 500 });
  }

  return Response.json({
    temperatureCelsius: {
      value: weatherData.current_weather.temperature,
      formatted: `${weatherData.current_weather.temperature}${weatherData.current_weather_units.temperature}`,
    },
    wind: {
      speedKmh: {
        value: weatherData.current_weather.windspeed,
        formatted: `${weatherData.current_weather.windspeed}${weatherData.current_weather_units.windspeed}`,
      },
      directionDeg: weatherData.current_weather.winddirection,
    },
    isDay: weatherData.current_weather.is_day === 1,
    weatherCodeWmo: weatherData.current_weather.weathercode,
  } as IWeatherResponse);
}
