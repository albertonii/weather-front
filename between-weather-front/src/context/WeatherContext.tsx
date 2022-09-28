import { createContext, useState } from "react";

interface WeatherProps {
  lat: string;
  lon: string;
  location: { city: string; country: string };
  current: { dt: Date; sunrise: Date; sunset: Date; temp: number };
  daily: {
    day: Date;
    hourly_temperature: number[];
  }[];
}

interface IWeatherContext {
  weather: WeatherProps | null;
  setWeather: (state: WeatherProps) => void;
}

const defaultWeather: WeatherProps = {
  lat: "",
  lon: "",
  location: { city: "", country: "" },
  current: { dt: new Date(), sunrise: new Date(), sunset: new Date(), temp: 0 },
  daily: [
    {
      day: new Date(),
      hourly_temperature: [0],
    },
  ],
};

const WeatherContext = createContext<IWeatherContext>({
  weather: defaultWeather,
  setWeather: () => {},
});

interface IChildrenProps {
  children: JSX.Element | JSX.Element[];
}

export const WeatherProvider = ({ children }: IChildrenProps) => {
  const [weather, setWeather] = useState<WeatherProps | null>(null);

  return (
    <WeatherContext.Provider value={{ weather, setWeather }}>
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherContext;
