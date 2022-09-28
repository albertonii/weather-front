import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import WeatherDaily from "./components/WeatherDaily";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <WeatherDaily />
    </QueryClientProvider>
  );
}

export default App;
