/** @jsx jsx */
import "../css/main.css";
import "react-datepicker/dist/react-datepicker.css";
import { jsx } from "theme-ui";
import { ThemeProvider } from "theme-ui";
import theme from "../theme";
import Nav from "../src/components/Nav";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Standup Summary</title>
        <link rel="shortcut icon" href="pencil.png" />
      </Head>
      <div className="daily-standup-app">
        <Nav />
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}
