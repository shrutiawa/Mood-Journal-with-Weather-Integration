import { useState, useEffect } from 'react';

export function useWeather() {
  const [weather, setWeather] = useState({ temp: '', icon: '' });

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=bcce36b001b1f90a0dfc5b88809465ee&units=metric`
      );
      const data = await res.json();
      const icon = data.weather[0].icon;
      setWeather({
        temp: `${Math.round(data.main.temp)}°C`,
        icon: `http://openweathermap.org/img/wn/${icon}.png`,
      });
    });
  }, []);

  return weather;
}
