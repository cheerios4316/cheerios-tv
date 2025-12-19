import { ISettings } from "@/interface";
import fs from "fs";
import path from "path";

export const getSettings = () => {
  const filePath = path.join(process.cwd(), "/config/config.json");

  const configJson = JSON.parse(
    fs.readFileSync(filePath, "utf8") ?? ""
  );

  return {
    ...configJson,
    weather: {
      ...configJson.weather,
      latitude: parseFloat(process.env.WEATHER_LATITUDE ?? ""),
      longitude: parseFloat(process.env.WEATHER_LONGITUDE ?? ""),
    }
  } as ISettings;
};
