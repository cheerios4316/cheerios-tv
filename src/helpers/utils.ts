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
  if (remainderHundred >= 11 && remainderHundred <= 13) return 'th';

  switch (number % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}

export interface IDateNumeric {
  value: number,
  formatted?: string,
}

export interface IDateFormatted {
  day: IDateNumeric;
  month: IDateNumeric;
  year: number;
  time: {
    hours: IDateNumeric;
    minutes: IDateNumeric;
    seconds: IDateNumeric;
  }
}

export const formatDate = (date: Date) => {

  const pad = (date: Date, func: () => number) => String(func.call(date)).padStart(2, "0");

  return {
    day: {
      value: date.getDate(),
      formatted: date.getDate() + getOrdinalSuffix(date.getDate()),
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
    }
  }
}