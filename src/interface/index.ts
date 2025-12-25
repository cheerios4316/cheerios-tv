import { LucideIcon } from "lucide-react";
import { Metadata } from "next";

export interface ISettings {
  links: ILink[];
  search: ISearchSettings;
  backgroundImage?: string;
  metadata?: Metadata;
  weather?: IWeatherSettings;
}

export interface ISearchSettings {
  enable: boolean;
  endpoint: string;
}

export interface ILink {
  image: string;
  anchor: string;
  url: string;
}

export interface IWeatherSettings {
  enable: boolean;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  cityName?: string; // unused
  latitude: number | null;
  longitude: number | null;
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
