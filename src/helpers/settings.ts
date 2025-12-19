import { ISettings } from "@/interface";
import fs from "fs";
import path from "path";

export const getSettings = () => {
  const filePath = path.join(process.cwd(), "/config/config.json");

  return JSON.parse(
    fs.readFileSync(filePath, "utf8") ?? ""
  ) as ISettings;
};
