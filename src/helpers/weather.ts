import { ISettings, IWeatherIcon, IWeatherSettings } from "@/interface";
import {
  Sun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Moon,
} from "lucide-react";

export const getWeatherIcon = (code: number, isDay: boolean) => {
  const map = WMO_WEATHER_MAP;

  map[0] = {
    ...map[0],
    ...isDay ? {icon: Sun} : {icon: Moon}
  }

  return map[code];
}

export const WMO_WEATHER_MAP: Record<
  number, IWeatherIcon
> = {
  0: { icon: Sun, description: "Clear" },

  1: { icon: Cloud, description: "Mainly clear" },
  2: { icon: Cloud, description: "Partly cloudy" },
  3: { icon: Cloud, description: "Overcast" },

  45: { icon: CloudFog, description: "Fog" },
  48: { icon: CloudFog, description: "Depositing rime fog" },

  51: { icon: CloudDrizzle, description: "Drizzle (light)" },
  53: { icon: CloudDrizzle, description: "Drizzle (moderate)" },
  55: { icon: CloudDrizzle, description: "Drizzle (dense)" },
  56: { icon: CloudDrizzle, description: "Freezing drizzle (light)" },
  57: { icon: CloudDrizzle, description: "Freezing drizzle (dense)" },

  61: { icon: CloudRain, description: "Rain (slight)" },
  63: { icon: CloudRain, description: "Rain (moderate)" },
  65: { icon: CloudRain, description: "Rain (heavy)" },
  66: { icon: CloudRain, description: "Freezing rain (light)" },
  67: { icon: CloudRain, description: "Freezing rain (heavy)" },

  71: { icon: CloudSnow, description: "Snow fall (slight)" },
  73: { icon: CloudSnow, description: "Snow fall (moderate)" },
  75: { icon: CloudSnow, description: "Snow fall (heavy)" },
  77: { icon: CloudSnow, description: "Snow grains" },

  80: { icon: CloudRain, description: "Rain showers (slight)" },
  81: { icon: CloudRain, description: "Rain showers (moderate)" },
  82: { icon: CloudRain, description: "Rain showers (violent)" },

  85: { icon: CloudSnow, description: "Snow showers (slight)" },
  86: { icon: CloudSnow, description: "Snow showers (heavy)" },

  95: { icon: CloudLightning, description: "Thunderstorm (slight or moderate)" },
  96: { icon: CloudLightning, description: "Thunderstorm with hail (slight)" },
  99: { icon: CloudLightning, description: "Thunderstorm with hail (heavy)" },
};
