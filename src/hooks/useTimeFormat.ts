import { useEffect, useState } from "react";

export const useTimeFormat = (): string => {
  const [date, setDate] = useState<string>(formatDate(new Date()));

  useEffect(() => {
    const interval = setInterval(() => setDate(formatDate(new Date())), 1000);

    return () => clearInterval(interval);
  });

  return date;
};

const formatDate = (date: Date): string => {
  const month = date.toLocaleString("en-US", { month: "short" });
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  
  return `${month} ${day}, ${hours}:${minutes}`;
};
