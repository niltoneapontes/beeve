/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";

export const DarkTheme = {
  ...NavigationDarkTheme,
  primary: "#8A2BE2",
  secondary: "#FF9500",
  textColor: "#F5F5F5",
  backgroundColor: "#1C1C1C",
  cardBackground: "#0f0f0f",
  gray: "#A9A9A9",
  white: "#F5F5F5",
  brightWhite: '#FFFFFF',
  danger: "#ff5555",
  success: "#28a745",
  warning: "#ffc107",
};

export const DefaultTheme = {
  ...NavigationDefaultTheme,
  primary: "#8A2BE2",
  secondary: "#FF9500",
  textColor: "#1C1C1C",
  backgroundColor: "#F5F5F5",
  cardBackground: "#FFFFFF",
  gray: "#A9A9A9",
  white: "#F5F5F5",
  brightWhite: '#FFFFFF',
  danger: "#ff0000",
  success: "#00ff00",
  warning: "#ff9900",
};
