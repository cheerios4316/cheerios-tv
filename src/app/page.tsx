import { Clock } from "@/components/Clock/Clock";
import { ImageLink } from "@/components/ImageLink/ImageLink";
import { ISettings } from "@/interface";
import fs from "fs";
import path from "path";

import styles from "./page.module.scss";

export default function Home() {
  const filePath = path.join(process.cwd(), "/config/config.json");

  const data = JSON.parse(fs.readFileSync(filePath, "utf8") ?? "") as ISettings;

  const links = data.links ?? [];

  return (
    <main className={`${"flex items-center h-[100vh] md:h-[70vh]"}`}>

      {data.backgroundImage && <div className={styles["background"]}><img src={data.backgroundImage} alt="Background"  /></div>}

      <div className="flex flex-col items-center w-full gap-10 overflow-hidden">
        <div className="">
          <Clock />
        </div>
        <div className={`${styles["separator"]} w-86 h-px bg-white`}></div>
        <div className="flex flex-col md:flex-row items-center justify-center gap:8 md:gap-10">
          {links.map((link) => (
            <ImageLink
              key={link.url}
              imageUrl={link.image}
              anchor={link.anchor}
              href={link.url}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
