import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "../components/styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
