"use client";

import { FC, useEffect, useState } from "react";
import styles from "./Clock.module.scss";
import { formatDate } from "@/helpers/utils";

const Clock: FC = () => {
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 500);

    return () => clearInterval(timer);
  }, []);

  const formattedDate = formatDate(date);

  return (
    <div className={styles["clock"]}>
      <div className={styles["clock__date"]}>
        {formattedDate.day.formatted} of {formattedDate.month.formatted},{" "}
        {formattedDate.year}
      </div>
      <div className={styles["clock__separator"]}></div>
      <div className={styles["time"]}>
        <span>{formattedDate.time.hours.formatted}</span>
        <span>:</span>
        <span>{formattedDate.time.minutes.formatted}</span>
        <span>:</span>
        <span suppressHydrationWarning>{formattedDate.time.seconds.formatted}</span>
      </div>
    </div>
  );
};

export { Clock };
