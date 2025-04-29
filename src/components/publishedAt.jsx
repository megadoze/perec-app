"use client";

import { useMemo } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

// Подключаем плагины dayjs
dayjs.extend(utc);
dayjs.extend(timezone);

export default function PublishedAt({ timestamp, format = "DD MMM YYYY HH:mm" }) {
  const userTimeZone = useMemo(() => {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }, []);

  const formattedDate = useMemo(() => {
    return dayjs(timestamp).tz(userTimeZone).format(format);
  }, [timestamp, userTimeZone, format]);

  return <span>{formattedDate}</span>;
}
