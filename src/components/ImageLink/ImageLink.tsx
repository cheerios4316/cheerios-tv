"use client";

import { FC } from "react";
import styles from "./ImageLink.module.scss";
import Image from "next/image";
import { useIsMobile } from "@/hooks/useIsMobile";

interface IImageLinkProps {
  imageUrl: string;
  anchor: string;
  href: string;
}

const ImageLink: FC<IImageLinkProps> = ({ imageUrl, anchor, href }) => {
  const imageSize = useIsMobile() ? 100 : 300;

  const onClick = () => {
    window.open(href, "_blank");
  }

  return (
    <div className={styles["image-link"]} onClick={onClick}>
      <div className={styles["image-link__container"]}>
        <div className={styles["image-link__background"]}></div>
        <Image src={imageUrl} alt={anchor} width={imageSize} height={imageSize} />
      </div>
      <span>{anchor}<div className={styles["subtitle"]}></div></span>
    </div>
  );
};

export { ImageLink, type IImageLinkProps };
