import {Tabs, usePathname} from 'expo-router';
import React from 'react';

import {TabBarIcon} from '@/components/navigation/TabBarIcon';
import {Colors} from '@/constants/Colors';
import {useColorScheme} from '@/hooks/useColorScheme';
import {useStore} from "@/hooks/selectedTheme";

export default function TabLayout() {
    const colorScheme = useColorScheme();
    const {theme} = useStore()
    const pathname = usePathname();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[theme === "light" ? 'light' : "dark"].tint,
                headerShown: false,
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarLabelStyle:{display:pathname==="/"?"flex":"none"},
                    tabBarIcon: ({color, focused}) => (
                        <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    headerShown: true,
                    headerStyle: {backgroundColor:theme === "light"?"#e8e8e8":"#282828"},
                    title: 'Settings',
                    tabBarLabelStyle:{display:pathname==="/settings"?"flex":"none"},
                    tabBarIcon: ({color, focused}) => (
                        <TabBarIcon name={focused ? 'settings-sharp' : 'settings-outline'} color={color}/>
                    ),
                }}
            />
        </Tabs>
    );
}
