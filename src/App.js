import "./App.css";
import CustomNavbar from "./components/CustomNavbar";
import Routing from "./routing";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <CustomNavbar />
        <Routing />
      </ThemeProvider>
    </div>
  );
}

export default App;
