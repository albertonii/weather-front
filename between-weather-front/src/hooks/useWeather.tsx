import { useContext } from "react";
import WeatherContext from "../context/WeatherContext";

const useWeather = () => {
  return useContext(WeatherContext);
};

export default useWeather;
