import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import * as eva from "@eva-design/eva";
import { default as themeExtension} from "@/constants/theme-extension.json";

import { useEffect, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemeProvider } from "styled-components/native";
import { DarkTheme, DefaultTheme } from "@/constants/Colors";
import { SafeAreaView } from "react-native";
import { ApplicationProvider } from "@ui-kitten/components";
import { AuthProvider } from "@/context/auth";
import Toast from "react-native-toast-message";

SplashScreen.preventAutoHideAsync();

export interface IUser {
  id?: number;
  birthdate: string;
  createdAt: string;
  email: string;
  name: string;
  password: string;
  socialAccountId: string;
  socialAccountProvider: string;
  username: string;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

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
    <>
      <ApplicationProvider {...eva} theme={{...(colorScheme === "dark" ? eva.dark : eva.light), ...themeExtension}}>
        <AuthProvider>
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
          <ThemeProvider
            theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <Stack initialRouteName={"index"}>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="signup" options={{ headerShown: false }} />
              <Stack.Screen name="beverage" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
          </ThemeProvider>
        </SafeAreaView>
        </AuthProvider>
      </ApplicationProvider>
      <Toast />
    </>
  );
}
