import {SafeAreaView, useColorScheme, View, type ViewProps} from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import {useSafeAreaInsets} from "react-native-safe-area-context";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedSafeAreaView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const { top } = useSafeAreaInsets()
  const deviceTheme = useColorScheme()
  const backgroundColor = deviceTheme === "light" ? "#ffffff" : "#000000"
  return <SafeAreaView style={[{ backgroundColor, paddingTop:top,flex:1}, style]} {...otherProps} />;
}
