/** @jsx jsx */
import "../css/main.css";
import { jsx } from "theme-ui";
import { ThemeProvider } from "theme-ui";
import theme from "../theme";
import Nav from "../src/components/Nav";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <div className="daily-standup-app">
        <Nav />
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}
