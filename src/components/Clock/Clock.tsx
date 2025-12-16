"use client";

import { FC, useEffect, useState } from "react";
import styles from "./Clock.module.scss";
import { getOrdinalSuffix } from "@/helpers/utils";

interface IClockProps {}

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Clock: FC<IClockProps> = () => {
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 500);

    return () => clearInterval(timer);
  }, []);

  const dateString = date.getDate() + getOrdinalSuffix(date.getDate());
  const monthString = monthNames[date.getMonth()];
  const yearString = date.getFullYear();

  return (
    <div className={styles["clock"]}>
      <div className={styles["clock__date"]}>
        {dateString} of {monthString}, {yearString}
      </div>
      <div className={styles["clock__separator"]}></div>
      <div className={styles["time"]}>
        <span>{String(date.getHours()).padStart(2, "0")}</span>
        <span>:</span>
        <span>{String(date.getMinutes()).padStart(2, "0")}</span>
        <span>:</span>
        <span>{String(date.getSeconds()).padStart(2, "0")}</span>
      </div>
    </div>
  );
};

export { Clock, type IClockProps };
