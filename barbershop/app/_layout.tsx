
import { StatusBar } from "expo-status-bar";
import { WidgetProvider } from "@/contexts/WidgetContext";
import { AppointmentProvider } from "@/contexts/AppointmentContext";
import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import { Button } from "@/components/button";
import { useNetworkState } from "expo-network";
import React, { useEffect } from "react";
import "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";
import { Stack, router } from "expo-router";
import { SystemBars } from "react-native-edge-to-edge";
import { useColorScheme, Alert } from "react-native";
import { useFonts } from "expo-font";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  const colorScheme = useColorScheme();
  const { isConnected } = useNetworkState();

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <WidgetProvider>
          <AppointmentProvider>
            <SystemBars style="auto" />
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen
                name="modal"
                options={{
                  presentation: "modal",
                  title: "Modal",
                }}
              />
              <Stack.Screen
                name="formsheet"
                options={{
                  presentation: "formSheet",
                  title: "Form Sheet",
                  sheetAllowedDetents: [0.5, 1],
                  sheetGrabberVisible: true,
                }}
              />
              <Stack.Screen
                name="transparent-modal"
                options={{
                  presentation: "transparentModal",
                  animation: "fade",
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="booking/select-barber"
                options={{
                  title: "Select Barber",
                  presentation: "card",
                }}
              />
              <Stack.Screen
                name="booking/select-service"
                options={{
                  title: "Select Service",
                  presentation: "card",
                }}
              />
              <Stack.Screen
                name="booking/select-datetime"
                options={{
                  title: "Select Date & Time",
                  presentation: "card",
                }}
              />
              <Stack.Screen
                name="booking/confirm"
                options={{
                  title: "Confirm Appointment",
                  presentation: "card",
                }}
              />
            </Stack>
            <StatusBar style="auto" />
          </AppointmentProvider>
        </WidgetProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
