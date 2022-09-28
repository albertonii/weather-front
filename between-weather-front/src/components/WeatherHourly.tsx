import { Grid, Typography } from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Moment from "react-moment";
import "moment/locale/es";

const hourAMPM = [
  { time: "01:00" },
  { time: "02:00" },
  { time: "03:00" },
  { time: "04:00" },
  { time: "05:00" },
  { time: "06:00" },
  { time: "07:00" },
  { time: "08:00" },
  { time: "09:00" },
  { time: "10:00" },
  { time: "11:00" },
  { time: "12:00" },
  { time: "13:00" },
  { time: "14:00" },
  { time: "15:00" },
  { time: "16:00" },
  { time: "17:00" },
  { time: "18:00" },
  { time: "19:00" },
  { time: "20:00" },
  { time: "21:00" },
  { time: "22:00" },
  { time: "23:00" },
  { time: "24:00" },
];

interface DailyProps {
  day: Date;
  hourly_temperature: number[];
}

interface WeatherHourlyProps {
  dailyData: DailyProps | null;
}

const WeatherHourly = (props: WeatherHourlyProps) => {
  const { dailyData } = props;

  const getWeekDay = (dateStr: any, locale: string) => {
    const date = new Date(dateStr);
    let dateString = date.toLocaleDateString(locale, { weekday: "long" });
    return dateString.charAt(0).toUpperCase() + dateString.slice(1);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  if (!dailyData) return <></>;

  return (
    <>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          margin: "4rem 0 2rem 0",
        }}
      >
        Temperatura para el día &nbsp;
        {getWeekDay(dailyData?.day, "es-EN")}
        &nbsp;
        <Moment format="DD-MMMM-YYYY">{dailyData?.day}</Moment>
      </Typography>

      <Grid
        container
        spacing={{ xs: 4, md: 6 }}
        columns={{ xs: 3, sm: 3, md: 7 }}
        sx={{ margin: "0 0 4rem 0" }}
      >
        {Array.from(Array(dailyData.hourly_temperature.length)).map(
          (_, index) => (
            <>
              <Grid
                sx={{ margin: "4rem 0 0 0 " }}
                xs={1}
                sm={1}
                md={1}
                key={index}
              >
                <Item
                  sx={{
                    background: "#E6505A",
                    opacity: 0.6,
                    "&:hover": { opacity: 0.9 },
                    "&:onclick": { width: "1.5rem" },
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    {hourAMPM[index].time}
                  </Typography>
                  <Typography variant="h4" gutterBottom>
                    {dailyData.hourly_temperature[index]} º
                  </Typography>
                </Item>
              </Grid>
            </>
          )
        )}
      </Grid>
    </>
  );
};

export default WeatherHourly;
