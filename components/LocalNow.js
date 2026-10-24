"use client";

import { useEffect, useState } from "react";

const YAMAGA = { latitude: 33.038, longitude: 130.723, label: "山鹿市" };

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

export default function LocalNow() {
  const [now, setNow] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const timer = setInterval(tick, 1000);

    const load = (latitude, longitude, label) => {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&timezone=auto`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (!data.current) return;
          setWeather({
            label,
            temp: Math.round(data.current.temperature_2m),
            text: weatherLabel(data.current.weather_code)
          });
        })
        .catch(() => {});
    };

    fetch("https://ipwho.is/")
      .then((response) => response.json())
      .then((place) => {
        if (place && place.success && place.latitude && place.longitude) {
          load(place.latitude, place.longitude, place.city || "現在地");
          return;
        }
        load(YAMAGA.latitude, YAMAGA.longitude, YAMAGA.label);
      })
      .catch(() => load(YAMAGA.latitude, YAMAGA.longitude, YAMAGA.label));

    return () => clearInterval(timer);
  }, []);

  const time = now
    ? now.toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
    : "--:--:--";
  const date = now
    ? now.toLocaleDateString("ja-JP", { month: "long", day: "numeric", weekday: "short" })
    : "";

  return (
    <aside className="now-panel" aria-label="現在の時刻と天気">
      <time dateTime={now ? now.toISOString() : undefined}>{time}</time>
      <p>{date}</p>
      <p>{weather ? `${weather.label}　${weather.text}　${weather.temp}°C` : "天気を取得しています"}</p>
    </aside>
  );
}
