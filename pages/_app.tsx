import { useEffect } from "react";
import type { AppProps } from "next/app";
import AuthContextProvider from "../context/AuthContext";
import SnackbarContextProvider from "../context/SnackbarContext";
import initializeFirebase from "../firebase";
import Layout from "../components/Layout";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "../components/styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    initializeFirebase();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <SnackbarContextProvider>
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SnackbarContextProvider>
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default MyApp;
