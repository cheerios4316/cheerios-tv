import { IDateFormatted } from "@/interface";

export const months = [
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

export const getOrdinalSuffix = (number: number): string => {
  const remainderHundred = number % 100;
  if (remainderHundred >= 11 && remainderHundred <= 13) {
    return "th";
  }

  switch (number % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

export const formatDate = (date: Date): IDateFormatted => {
  const pad = (date: Date, func: () => number) =>
    String(func.call(date)).padStart(2, "0");

  const day = date.getDate();

  return {
    day: {
      value: day,
      formatted: day + getOrdinalSuffix(day),
    },
    month: {
      value: date.getMonth(),
      formatted: months[date.getMonth()],
    },
    year: date.getFullYear(),
    time: {
      hours: {
        value: date.getHours(),
        formatted: pad(date, date.getHours),
      },
      minutes: {
        value: date.getHours(),
        formatted: pad(date, date.getMinutes),
      },
      seconds: {
        value: date.getHours(),
        formatted: pad(date, date.getSeconds),
      },
    },
  };
};

export const uppercaseFirst = (value: string) => {
  return value.slice(0, 1).toUpperCase() + value.slice(1);
}

export const isEmptyObject = (obj: object) => Object.keys(obj).length === 0;