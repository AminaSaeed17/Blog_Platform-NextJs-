import { createTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

export type Mode = "light" | "dark";


export const getDesignTokens = (mode: Mode) => ({
  palette: {
    mode,

    ...(mode === "light"
      ? {
          background: {
            default: "#F6F6F6", // body background
            paper: "#FFFFFF",   // cards, navbar, etc
          },

          text: {
            primary: "#2B3445",
            secondary: "#64748B",
          },

          favColor: {
            main: grey[300],
          },
        }
      : {
          background: {
            default: "#1D2021", // body background
            paper: "#252B32",
          },

          text: {
            primary: "#FFFFFF",
            secondary: "#94A3B8",
          },

          favColor: {
            main: grey[800],
          },
        }),
  },
});


export const createAppTheme = (mode: Mode) => {
  return createTheme(getDesignTokens(mode));
};