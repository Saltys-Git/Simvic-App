import {Animated, View, type ViewProps} from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import {Surface} from "react-native-paper";
import {PropsWithChildren} from "react";
type Elevation = 0 | 1 | 2 | 3 | 4 | 5 | Animated.Value;

export type ThemedViewProps = PropsWithChildren & ViewProps & {
  elevation: Elevation;
  lightColor?: string;
  darkColor?: string;
};

export function ThemedSurface({children,style, elevation, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  return <Surface elevation={elevation} style={[{ backgroundColor }, style]} {...otherProps} >
    {children}
  </Surface>;
}
