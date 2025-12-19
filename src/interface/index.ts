import { LucideIcon } from "lucide-react";
import { Metadata } from "next";

export interface ISettings {
  links: ILink[];
  searchEndpoint: string;
  backgroundImage?: string;
  metadata?: Metadata;
  weather?: IWeatherSettings;
}

export interface ILink {
  image: string;
  anchor: string;
  url: string;
}

export interface IWeatherSettings {
  enable: boolean;
  cityName: string;
  latitude: number; // set in .env, not config.json!
  longitude: number; // set in .env, not config.json!
}

export interface IFormattedValue<T = number> {
  value: T;
  formatted?: string;
}

export interface IDateFormatted {
  day: IFormattedValue;
  month: IFormattedValue;
  year: number;
  time: {
    hours: IFormattedValue;
    minutes: IFormattedValue;
    seconds: IFormattedValue;
  };
}

export interface IWeatherIcon {
  icon: LucideIcon;
  description: string;
}
