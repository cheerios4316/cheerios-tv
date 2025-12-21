"use server";

import { ISettings } from "@/interface";
import { cookies } from "next/headers";

export const getSettings = async () => {
  const awaitedCookies = await cookies();

  const cookieSettings = awaitedCookies.get("settings")?.value;

  try {
    const awaitedSettings = JSON.parse(cookieSettings ?? "{}");

    if (!awaitedSettings) {
      return null;
    }

    return awaitedSettings as ISettings;
  } catch (error) {
    return null;
  }
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
