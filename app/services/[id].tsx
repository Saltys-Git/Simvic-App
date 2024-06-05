import {ThemedScrollView} from '@/components/ThemedScrollView';
import * as React from 'react';
import {ThemedView} from "@/components/ThemedView";
import {StyleSheet} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import {useStore} from "@/hooks/selectedTheme";
import {Image} from "expo-image";
import {ServiceList} from "@/constants/Services";
import {Stack, usePathname} from "expo-router";

const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


const Service = () => {
    const pathname = usePathname();
    const {theme} = useStore()
    const item = ServiceList.find((item)=> item.link === pathname)
    return (
        <ThemedScrollView>
            <ThemedView style={styles.stepContainer}>
                <Stack.Screen options={{
                                  headerTitle: item?.heading,
                                  headerStyle: {backgroundColor: theme === "light" ? "#e8e8e8" : "#282828"}
                              }}/>
                <Image
                    placeholder={{ blurhash }}
                    contentFit="cover"
                    transition={1000}
                    source={item?.src}
                    style={{
                        aspectRatio: "1.4/1",
                        width: "100%",
                        alignSelf: "center",
                    }}/>
                <ThemedView style={styles.titleContainer}>
                    <ThemedText type="title">{item?.heading}</ThemedText>
                </ThemedView>
                <ThemedText>
                    {item?.paragraph}
                </ThemedText>
            </ThemedView>
        </ThemedScrollView>
    );
};

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        justifyContent: "center",
        marginTop:32,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
        padding: 16
    }
});

export default Service;