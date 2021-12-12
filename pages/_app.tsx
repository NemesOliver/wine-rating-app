import type { AppProps } from "next/app";
import AuthContextProvider from "../context/AuthContext";
import initializeFirebase from "../firebase";
import Layout from "../components/Layout";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "../components/styles/theme";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    initializeFirebase();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default MyApp;
