import { Clock } from "@/components/Clock/Clock";
import { ImageLink } from "@/components/ImageLink/ImageLink";
import styles from "./page.module.scss";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import { getSettings } from "@/helpers/settings";
import Image from "next/image";

export default function Home() {
  const settings = getSettings();

  const links = settings.links ?? [];

  return (
    <main className={`${"flex items-center h-[100vh]"}`}>
      {settings.backgroundImage && (
        <div className={styles["background"]}>
          <Image src={settings.backgroundImage} alt="Background" fill />
        </div>
      )}

      <div className="flex flex-col md:flex-col-reverse items-center w-full">
        <div className="w-full flex justify-center p-12">
          <SearchBar endpoint={settings.searchEndpoint} />
        </div>
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
      </div>
    </main>
  );
}
