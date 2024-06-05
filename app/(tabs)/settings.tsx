import {Linking, Pressable, Share, StyleSheet} from 'react-native';
import React, {useState} from "react";
import * as StoreReview from 'expo-store-review';
import {Divider, List, RadioButton} from "react-native-paper";
import {useStore} from "@/hooks/selectedTheme";
import {ThemedScrollView} from "@/components/ThemedScrollView";
import {ThemedListItem, ThemedListSection} from "@/components/ThemedList";


export default function TabTwoScreen() {
    const {theme, setTheme} = useStore()
    const [isPPOpen, setIsPPOpen] = useState(false)
    return (
        <ThemedScrollView>
            <ThemedListSection style={{
                width: "100%",
                gap: 2,
            }} title="Theme">
                <Pressable
                    style={{
                        borderRadius: 8,
                        height: 70,
                        padding: 0,
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                    onPress={async () => {
                        setTheme('light')
                    }}
                >
                    <ThemedListItem
                        title="Light"
                        description="Set the app theme to light mode"
                        titleStyle={{
                            fontWeight: "bold"
                        }}
                        left={(props) => <List.Icon {...props} color={theme === "light" ? "#646464" : "#cecece"}
                                                    icon="white-balance-sunny"/>}
                        right={() => <RadioButton
                            value="light"
                            color={theme === "light" ? "#0000fe" : "#2f95dc"}
                            status={theme === 'light' ? 'checked' : 'unchecked'}
                            onPress={() => setTheme('light')}
                        />}
                        style={{
                            width: "95%",
                            padding: 0
                        }}
                    />
                </Pressable>
                <Divider/>
                <Pressable
                    style={{
                        borderRadius: 8,
                        height: 70,
                        padding: 0,
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                    onPress={async () => {
                        setTheme('dark')
                    }}
                >
                    <ThemedListItem
                        title="Dark"
                        description="Set the app theme to dark mode"
                        titleStyle={{
                            fontWeight: "bold"
                        }}
                        left={(props) => <List.Icon {...props} color={theme === "light" ? "#646464" : "#cecece"}
                                                    icon="moon-waning-crescent"/>}
                        right={() => <RadioButton
                            value="dark"
                            color={theme === "light" ? "#0000fe" : "#2f95dc"}
                            status={theme === 'dark' ? 'checked' : 'unchecked'}
                            onPress={() => setTheme('dark')}
                        />}
                        style={{
                            width: "95%",
                            padding: 0
                        }}
                    />
                </Pressable>
            </ThemedListSection>
            <ThemedListSection
                style={{
                    width: "100%",
                    gap: 2,
                }} title="More">
                <Pressable
                    style={{
                        borderRadius: 8,
                        height: 70,
                        padding: 0,
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                    onPress={async () => {
                        if (await StoreReview.hasAction()) {
                            await StoreReview.requestReview()
                        }else{
                            const androidPackageName = 'com.simvic.co';
                            await Linking.openURL(`market://details?id=${androidPackageName}&showAllReviews=true`);
                        }
                    }}
                >
                    <ThemedListItem
                        title="Rate us"
                        left={(props) => <List.Icon {...props}
                                                    color={theme === "light" ? "#646464" : "#cecece"}
                                                    icon="star"/>}
                        style={{
                            width: "95%",
                            padding: 0
                        }}
                    />
                </Pressable>
                <Divider/>
                <Pressable
                    style={{
                        borderRadius: 8,
                        height: 70,
                        padding: 0,
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                    onPress={async () => {
                        try {
                            await Share.share({
                                message: `Hey there! I've been using Simvic App lately and it's been amazing for their scrap metal service. I thought you might find it useful too! You can check it out on the ${"\n"}AppStore:${"\n"}${"\n"}PlayStore: https://play.google.com/store/apps/details?id=com.simvic.co${"\n"}`
                            });
                        } catch (error) {
                            console.error('Error sharing:', error);
                        }
                    }}
                >
                    <ThemedListItem
                        title="Invite a friend"
                        left={(props) => <List.Icon {...props}
                                                    color={theme === "light" ? "#646464" : "#cecece"}
                                                    icon="share-variant-outline"/>}
                        style={{
                            width: "95%",
                            padding: 0
                        }}
                    />
                </Pressable>
            </ThemedListSection>
        </ThemedScrollView>
    );
}

const styles = StyleSheet.create({
    headerImage: {
        color: '#808080',
        bottom: -90,
        left: -35,
        position: 'absolute',
    },
    titleContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    reactLogo: {
        width: '100%',
        height: '100%',
    },
});
