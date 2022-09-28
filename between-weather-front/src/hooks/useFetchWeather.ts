import { useQuery } from "react-query";
import axios from "axios";
import useWeather from "./useWeather";

const axiosConfig = {
  "Access-Control-Allow-Origin": "*",
  Accept: "application/json",
  "Content-Type": "application/json",
};

interface FetchWeatherProps {
  city: string;
}

const fetchWeather = async (city: string) => {
  const instance = axios.create({
    baseURL: "https://between-nodejs.herokuapp.com",
    headers: axiosConfig,
  });

  const weatherResponse = await instance.get(`/v1/weather/query?city=${city}`);
  return weatherResponse.data.results[0];
};

const useFetchWeather = (props: FetchWeatherProps) => {
  const { city } = props;
  const { setWeather } = useWeather();

  const { data, isFetching, refetch } = useQuery(
    ["fetchWeather", city],
    async () => {
      setWeather(await fetchWeather(city));
    },
    { enabled: false }
  );

  return { data, isFetching, refetch };
};

export default useFetchWeather;
