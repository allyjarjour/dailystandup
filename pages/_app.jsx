/** @jsx jsx */
import "../css/main.css";
import "react-datepicker/dist/react-datepicker.css";
import { jsx } from "theme-ui";
import { ThemeProvider } from "theme-ui";
import theme from "../theme";
import Nav from "../src/components/Nav";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import AppFrame from "../src/components/AppFrame";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Head>
          <title>Standup Summary</title>
          <link rel="Standup Summary icon" href="./standup_summary_2.png" />
        </Head>
        <div className="daily-standup-app">
          <SessionProvider session={session}>
            <Nav />
            <AppFrame>
              <Component {...pageProps} />
            </AppFrame>
          </SessionProvider>
        </div>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
