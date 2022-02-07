/** @jsx jsx */
import "../css/main.css";
import "react-datepicker/dist/react-datepicker.css";
import { jsx } from "theme-ui";
import { ThemeProvider } from "theme-ui";
import theme from "../theme";
import Nav from "../src/components/Nav";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Daily Standup</title>
        <link
          rel="shortcut icon"
          href="https://static.thenounproject.com/png/79533-200.png"
        />
      </Head>
      <div className="daily-standup-app">
        <SessionProvider session={session}>
          <Nav />
          <Component {...pageProps} />
        </SessionProvider>
      </div>
    </ThemeProvider>
  );
}
