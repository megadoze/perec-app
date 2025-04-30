"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function PublishedAt({
  timestamp,
  format = "DD MMM YYYY HH:mm",
}) {
  const [clientTime, setClientTime] = useState("");

  useEffect(() => {
    if (!timestamp) return;
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const formatted = dayjs(timestamp).tz(userTimeZone).format(format);
    setClientTime(formatted);
  }, [timestamp, format]);

  if (!clientTime) return null;

  return <span>{clientTime}</span>;
}

// import dayjs from "dayjs";
// import utc from "dayjs/plugin/utc";
// import timezone from "dayjs/plugin/timezone";

// // Подключаем плагины dayjs
// dayjs.extend(utc);
// dayjs.extend(timezone);

// export default function PublishedAt({
//   timestamp,
//   format = "DD MMM YYYY HH:mm",
// }) {
//   const formattedDate = dayjs(timestamp).tz("Europe/Madrid").format(format);
//   return <span>{formattedDate}</span>;
// }
