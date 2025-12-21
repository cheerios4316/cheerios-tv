import { IWeatherResponse } from "@/interface/api";

export const fetchWeather = async (
  latitude: number,
  longitude: number
): Promise<IWeatherResponse> => {
  const endpoint = `/api/weather?latitude=${latitude}&longitude=${longitude}`;
  const response = await fetch(endpoint, { method: "GET" });
  return (await response.json()) as IWeatherResponse;
};