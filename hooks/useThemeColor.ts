/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { useColorScheme } from 'react-native';

import { Colors } from '@/constants/Colors';
import {useStore} from "@/hooks/selectedTheme";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const {theme} = useStore()
  const themeValue = theme === "dark" ? "dark" : "light";
  const colorFromProps = props[themeValue];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[themeValue][colorName];
  }
}
