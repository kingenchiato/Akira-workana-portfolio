"use client";

import { useEffect, useState } from "react";

const TOKYO = { latitude: 35.6762, longitude: 139.6503 };

function weatherLabel(code) {
  if (code === 0) return "晴れ";
  if (code <= 3) return "くもり";
  if (code === 45 || code === 48) return "霧";
  if (code >= 51 && code <= 67) return "雨";
  if (code >= 71 && code <= 77) return "雪";
  if (code >= 80 && code <= 82) return "にわか雨";
  if (code >= 85 && code <= 86) return "にわか雪";
  if (code >= 95) return "雷";
  return "天気";
}

export default function TokyoNow() {
  const [now, setNow] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const timer = setInterval(tick, 1000);
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${TOKYO.latitude}&longitude=${TOKYO.longitude}&current=temperature_2m,weather_code&timezone=Asia%2FTokyo`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (!data.current) return;
        setWeather({
          temp: Math.round(data.current.temperature_2m),
          text: weatherLabel(data.current.weather_code)
        });
      })
      .catch(() => {});
    return () => clearInterval(timer);
  }, []);

  const time = now
    ? now.toLocaleTimeString("ja-JP", {
        timeZone: "Asia/Tokyo",
        hour: "2-digit",
        minute: "2-digit"
      })
    : "--:--";

  return (
    <p className="tokyo-now" aria-label="東京の時刻と天気">
      <span>東京</span>
      <time dateTime={now ? now.toISOString() : undefined}>{time}</time>
      <span>{weather ? `${weather.text} ${weather.temp}°C` : "天気"}</span>
    </p>
  );
}
