"use client";

import ThemeRegistry from "./ThemeContext";
import { Provider } from "react-redux";
import { store } from "./_redux/store";



export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeRegistry>
        {children}
      </ThemeRegistry>
    </Provider>
  );
}
