import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemeProvider } from "styled-components/native";
import { DarkTheme, DefaultTheme } from "@/constants/Colors";
import LoginScreen from "./login";
import { SafeAreaView } from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export interface IUser {
  email: string;
  password: string;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [user, setUser] = useState<IUser>({} as IUser);

  const [loaded] = useFonts({
    Raleway: require("../assets/fonts/Raleway-Regular.ttf"),
    RalewayBold: require("../assets/fonts/Raleway-Bold.ttf"),
    RalewayBlack: require("../assets/fonts/Raleway-Black.ttf"),
    OpenSans: require("../assets/fonts/OpenSans-Regular.ttf"),
    OpenSansBold: require("../assets/fonts/OpenSans-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        width: "100%",
        backgroundColor:
          colorScheme === "dark"
            ? DarkTheme.backgroundColor
            : DefaultTheme.backgroundColor,
      }}
    >
      <ThemeProvider theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}>

        <Stack initialRouteName="login">
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="cadastro" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </SafeAreaView>
  );
}
