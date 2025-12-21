import { ILink, ISettings } from "@/interface";

const mapLinks = (formData: FormData): ILink[] => {
  const links: Record<number, Partial<ILink>> = {};

  for (const [key, value] of formData.entries()) {
    const parts = key.split("_");
    if (parts[0] !== "links") continue;

    const index = Number(parts[2]);
    const field = parts[1] as keyof ILink;

    if (!links[index]) links[index] = {};
    links[index][field] = String(value);
  }

  return Object.values(links) as ILink[];
};

const mapSettings = (formData: FormData): ISettings => {
  return {
    searchEndpoint: formData.get("search-endpoint") as string,
    backgroundImage: formData.get("background-image") as string,
    weather: {
      enable: formData.get("weather-enable") === "true",
      latitude: Number(formData.get("weather-latitude")),
      longitude: Number(formData.get("weather-longitude")),
      position: formData.get("weather-position") as "top-left"|"top-right"|"bottom-left"|"bottom-right",
    },
    links: mapLinks(formData),
  };
};

export const mapper = {
  settings: mapSettings,
};
