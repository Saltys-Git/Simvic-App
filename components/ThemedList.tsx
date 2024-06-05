import {StyleProp, TextStyle, View, type ViewProps} from 'react-native';

import {useThemeColor} from '@/hooks/useThemeColor';
import {List} from 'react-native-paper';
import {Style} from "react-native-paper/src/components/List/utils";
import * as React from "react";

export type ThemedListSectionProps = ViewProps & {
    title: string;
    lightColor?: string;
    darkColor?: string;
};
export type ThemedListItemProps = ViewProps & {
    title: string;
    titleStyle?: StyleProp<TextStyle>;
    description?: string;
    descriptionStyle?: StyleProp<TextStyle>;
    left?: (props: { color: string; style: Style }) => React.ReactNode;
    right?: (props: { color: string; style?: Style }) => React.ReactNode;
    lightColor?: string;
    darkColor?: string;

};

export function ThemedListSection({
                                      children,
                                      style,
                                      title,
                                      lightColor,
                                      darkColor,
                                      ...otherProps
                                  }: ThemedListSectionProps) {
    const color = useThemeColor({light: lightColor, dark: darkColor}, 'text');

    return <List.Section titleStyle={[{color}, style]} {...otherProps} title={title}>
        {children}
    </List.Section>;
}

export function ThemedListItem({
                                   children,
                                   style,
                                   title,
                                   titleStyle,
                                   description,
                                   descriptionStyle,
                                   left,
                                   right,
                                   lightColor,
                                   darkColor,
                                   ...otherProps
                               }: ThemedListItemProps) {
    const color = useThemeColor({light: lightColor, dark: darkColor}, 'text');

    return <List.Item title={title} titleStyle={[{color}, titleStyle]} description={description}
                      descriptionStyle={[{color}, descriptionStyle]} style={style} {...otherProps} left={left} right={right}/>;
}
