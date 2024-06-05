import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, {useEffect, useState} from 'react';
import 'react-native-reanimated';
import {PaperProvider} from 'react-native-paper';
import {useColorScheme} from '@/hooks/useColorScheme';
import {useStore} from "@/hooks/selectedTheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {StatusBar} from "expo-status-bar";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

async function fetchTheme() {
    try {
        const value = await AsyncStorage.getItem('themeValue');
        return value
    } catch (e) {
        return null
    }
}

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [themeLoaded, setThemeLoaded] = useState(false)
    const {theme, setTheme} = useStore()
    const [loaded] = useFonts({
        SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
    });

    useEffect(() => {
        fetchTheme().then((res) => {
            if (res && res !== null) {
                setTheme(res)
            } else {
                setTheme(colorScheme ?? "light")
            }
            setTimeout(() => {
                setThemeLoaded(true)
            }, 2000)
        })
    }, []);
    useEffect(() => {
        if (loaded && themeLoaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded, themeLoaded]);

    if (!loaded || !themeLoaded) {
        return null;
    }

    return (
        <ThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
            <PaperProvider>
                <StatusBar style={theme === "light" ? "dark" : "light"}
                           backgroundColor={theme === "light" ? "#e8e8e8" : "#282828"}/>
                <Stack>
                    <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
                    <Stack.Screen name="+not-found"/>
                    <Stack.Screen name="priceList/index"
                                  options={{
                                      headerTitle: "Price List",
                                      headerStyle: {backgroundColor: theme === "light" ? "#e8e8e8" : "#282828"}
                                  }}/>
                    <Stack.Screen name="services/index"
                                  options={{
                                      headerTitle: "Services",
                                      headerStyle: {backgroundColor: theme === "light" ? "#e8e8e8" : "#282828"}
                                  }}/>
                </Stack>
            </PaperProvider>
        </ThemeProvider>
    );
}
