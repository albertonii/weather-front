import { SelectChangeEvent } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Container, Grid, MenuItem, Select, Typography } from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import "moment/locale/es";
import useFetchWeather from "../hooks/useFetchWeather";
import useWeather from "../hooks/useWeather";
import WeatherHourly from "./WeatherHourly";

interface DailyProps {
  day: Date;
  hourly_temperature: number[];
}

interface WeatherProps {
  lat: string;
  lon: string;
  location: { city: string; country: string };
  current: { dt: Date; sunrise: Date; sunset: Date; temp: number };
  daily: DailyProps[];
}

const WeatherDaily = () => {
  const [selectedCity, setSelectedCity] = useState<string>("Escoger");
  const [weatherData, setWeatherData] = useState<WeatherProps | null>(null);
  const [dailyData, setDailyData] = useState<DailyProps | null>(null);

  const { refetch, isFetching } = useFetchWeather({ city: selectedCity });
  const { weather } = useWeather();

  const selectChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;

    setSelectedCity(value);
    setDailyData(null);
  };

  const handleWeatherClick = (wData: DailyProps) => {
    setDailyData(wData);
  };

  useEffect(() => {
    refetch();
  }, [selectedCity]);

  useEffect(() => {
    setWeatherData(weather);
  }, [weather]);

  const averageTemp = (tempArr: number[]) =>
    (
      tempArr.reduce((a: number, b: number) => a + b, 0) / tempArr.length
    ).toFixed(0);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const getWeekDay = (dateStr: any, locale: string) => {
    const date = new Date(dateStr);
    let dateString = date.toLocaleDateString(locale, { weekday: "long" });
    return dateString.charAt(0).toUpperCase() + dateString.slice(1);
  };

  if (isFetching) {
    return <CircularProgress />;
  }

  return (
    <Container fixed>
      <Container
        sx={{
          margin: "2rem 0 0 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Select
          labelId="select-city-label"
          id="select-city"
          value={selectedCity}
          label="City"
          onChange={(e) => selectChange(e)}
          input={<OutlinedInput label="City" />}
        >
          <MenuItem selected disabled>
            Ciudad:
          </MenuItem>
          <MenuItem value="Escoger" hidden>
            Escoger Ciudad
          </MenuItem>
          <MenuItem value="Madrid">Madrid</MenuItem>
          <MenuItem value="Barcelona">Barcelona</MenuItem>
          <MenuItem value="Las Palmas">Las Palmas</MenuItem>
        </Select>
      </Container>

      <Typography variant="h1" gutterBottom>
        {weatherData?.location.city}
      </Typography>

      {weatherData ? (
        <>
          <Grid
            container
            spacing={{ xs: 4, md: 6 }}
            columns={{ xs: 3, sm: 3, md: 7 }}
          >
            {Array.from(Array(7)).map((_, index) => (
              <Grid
                sx={{ margin: "4rem 0 0 0 " }}
                xs={1}
                sm={1}
                md={1}
                key={index}
              >
                <Item
                  sx={{
                    background: "#111214",
                    opacity: 0.6,
                    "&:hover": { opacity: 0.9 },
                    "&:onclick": { width: "1.5rem" },
                  }}
                  onClick={() => handleWeatherClick(weatherData.daily[index])}
                >
                  <Typography variant="h6" gutterBottom>
                    {getWeekDay(weatherData.daily[index]?.day, "es-EN")}
                  </Typography>
                  <br />
                  <Moment format="DD-MMMM-YYYY">
                    {weatherData.daily[index]?.day}
                  </Moment>
                  <Typography variant="h3" gutterBottom>
                    {averageTemp(weatherData.daily[index]?.hourly_temperature)}{" "}
                    º
                  </Typography>
                </Item>
              </Grid>
            ))}
          </Grid>

          <WeatherHourly dailyData={dailyData} />
        </>
      ) : (
        <Typography variant="h3" gutterBottom>
          Selecciona una ciudad para obtener el tiempo que va a hacer.
        </Typography>
      )}
    </Container>
  );
};

export default WeatherDaily;
