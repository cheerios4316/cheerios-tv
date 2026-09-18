"use client";

import {CSSProperties, FC, useEffect, useRef} from "react";
import {useClickHoldPosition} from "@/components/ClickHold/ClickHold";
import styles from "./RadialSelector.module.scss";
import {ILink} from "@/interface";
import {UndoDot} from "lucide-react";

interface IRadialSelectorProps {
    links: ILink[];
    radius?: number;
    iconInset?: number;
}

const RadialSelector: FC<IRadialSelectorProps> = ({links, radius = 200, iconInset = 1}) => {
    const initialMousePosition = useClickHoldPosition();
    const selectorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!initialMousePosition || !selectorRef.current) {
            return;
        }

        const boundary = radius + radius * 0.3;
        let mouseX = initialMousePosition.x;
        let mouseY = initialMousePosition.y;

        if (mouseX + boundary > window.innerWidth) {
            mouseX -= mouseX + boundary - window.innerWidth;
        }
        if (mouseX - boundary < 0) {
            mouseX -= mouseX - boundary;
        }
        if (mouseY + boundary > window.innerHeight) {
            mouseY -= mouseY + boundary - window.innerHeight;
        }
        if (mouseY - boundary < 0) {
            mouseY -= mouseY - boundary;
        }

        selectorRef.current.style.setProperty("--mouseX", `${mouseX}px`);
        selectorRef.current.style.setProperty("--mouseY", `${mouseY}px`);
        selectorRef.current.style.visibility = "visible";
    }, [initialMousePosition, radius]);

    return (
        <div className={styles["container"]} data-click-hold-close>
            <div
                ref={selectorRef}
                className={styles["radial-selector"]}
                style={
                    {
                        "--radius": `${radius}px`,
                        "--count": links.length,
                        "--icon-scale": (radius / 150),
                        "--icon-inset": (iconInset),
                        visibility: "hidden",
                    } as CSSProperties
                }
            >
                <div className={styles["radial-selector__background"]}></div>
                <div className={styles["radial-selector__exit"]} data-click-hold-close>
                    <UndoDot size={32}/>
                </div>
                {links.map((elem, index) => (
                    <div
                        key={elem.anchor}
                        className={styles["radial-selector__item"]}
                        style={{"--index": index} as CSSProperties}
                    >
                        <a href={elem.url} target={"_blank"}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={elem.image} alt={elem.anchor}/>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export {RadialSelector, type IRadialSelectorProps};
