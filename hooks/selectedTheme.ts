import { create } from 'zustand'
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useColorScheme} from "@/hooks/useColorScheme";

type Store = {
    theme: string
    setTheme: (theme:string) => void
}


const setThemeData = async (themeValue: string) => {
    await AsyncStorage.setItem('themeValue', `${themeValue}`);
};

export const useStore = create<Store>()((set) => ({
    theme: "light",
    setTheme: ((theme:string) => {
        set(() => ({theme}))
        setThemeData(theme)
    })
}))
