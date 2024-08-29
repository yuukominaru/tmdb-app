import { ToastContainer } from "react-toastify";
import "./App.css";
import CustomNavbar from "./components/CustomNavbar";
import Routing from "./routing";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";

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
        <ToastContainer />
        <CustomNavbar />
        <Routing />
      </ThemeProvider>
    </div>
  );
}

export default App;
