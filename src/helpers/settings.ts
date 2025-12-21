"use server";

import { ISettings } from "@/interface";
import { cookies } from "next/headers";

export const getSettings = async () => {
  const awaitedCookies = await cookies();

  const awaitedSettings = JSON.parse(
    awaitedCookies.get("settings")?.value ?? "{}"
  );

  if (!awaitedSettings) {
    return null;
  }

  const settings = awaitedSettings as ISettings;

  return {
    ...settings,
    weather: {
      ...settings.weather,
      latitude: parseFloat(process.env.WEATHER_LATITUDE ?? ""),
      longitude: parseFloat(process.env.WEATHER_LONGITUDE ?? ""),
    },
  } as ISettings;
};

export const getDefaultSettings = async (): Promise<ISettings> => ({
  searchEndpoint: "https://duckduckgo.com/",
  weather: {
    enable: true,
    position: "bottom-right",
    latitude: null,
    longitude: null,
  },
  links: [
    {
      image: "/images/youtube.png",
      anchor: "YouTube",
      url: "https://www.youtube.com",
    },
    {
      image: "/images/jellyfin.png",
      anchor: "Jellyfin",
      url: "http://192.168.0.8:8096",
    },
    {
      image: "/images/netflix.png",
      anchor: "Netflix",
      url: "https://www.netflix.com",
    },
  ],
  metadata: {
    title: "cheerios tv",
    description: "homepage for my television :)",
  },
  backgroundImage: "/images/background.jpg",
});
