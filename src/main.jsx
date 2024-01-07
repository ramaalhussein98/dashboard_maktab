import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import "./i18n";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";


import { UserProvider } from "./context/userContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const theme = createTheme({
  direction: "rtl", // Both here and <body dir="rtl">
  typography: {
    fontFamily: "Tajawal, sans-serif", // Replace 'Your Custom Font' with your desired font
  },
});
// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <CacheProvider value={cacheRtl}> */}
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <UserProvider>
          <QueryClientProvider client={queryClient}>
            <App />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </UserProvider>
      </ThemeProvider>
    </BrowserRouter>
    {/* </CacheProvider> */}
  </React.StrictMode>
);
