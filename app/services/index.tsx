import * as React from 'react';
import {FlatList, Pressable, StyleSheet, View} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import {useThemeColor} from "@/hooks/useThemeColor";
import {useStore} from "@/hooks/selectedTheme";
import {Link} from "expo-router";
import {ThemedSurface} from "@/components/ThemedSurface";
import {Image} from 'expo-image';
import {ServiceList} from "@/constants/Services";
import LottieView from "lottie-react-native";

const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const Services = () => {
    return (
        <FlatList
            data={ServiceList}
            contentContainerStyle={styles.content}
            columnWrapperStyle={styles.column}
            numColumns={2}
            renderItem={({ item }) => (
                <Link href={item.link} asChild>
                    <Pressable style={{flex:1}}>
                        <ThemedSurface elevation={2} style={styles.box} lightColor={"#f6f6f6"} darkColor={"#595959"}>
                            {item.heading !== "Learn More" ?
                                <Image
                                    placeholder={{ blurhash }}
                                    contentFit="cover"
                                    transition={1000}
                                    source={item.src}
                                    style={{
                                        height:"80%",
                                        width: "100%",
                                        alignSelf: "center",
                                        justifyContent: "flex-start",
                                        borderTopRightRadius:20,
                                        borderTopLeftRadius:20
                                    }}/>
                                :
                                <LottieView
                                    autoPlay
                                    source={item.src}
                                    style={{
                                        height:"80%",
                                        width: "100%",
                                        alignSelf: "center",
                                    }}/>
                            }
                            <View style={{height:"20%", padding:4, alignItems:"center", justifyContent:"center"}}>
                                <ThemedText type="defaultSemiBold" style={{
                                    textAlign:"center"
                                }}>{item.heading}</ThemedText>
                            </View>
                        </ThemedSurface>
                    </Pressable>
                </Link>
            )}
        />
    );
};

const styles = StyleSheet.create({
    content: {
        gap: 10,
        padding: 10,
        width:"100%",
    },
    column: {
        gap: 10,
    },
    box: {
        flex: 1,
        aspectRatio: 1,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Services;