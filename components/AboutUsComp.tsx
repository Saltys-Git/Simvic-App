import {Button, Dialog, Portal, TextInput} from "react-native-paper";
import Toast from "react-native-toast-message";
import {number, object, string} from "yup";
import {useThemeColor} from "@/hooks/useThemeColor";
import {Formik, FormikHelpers} from "formik";
import {ThemedView} from "./ThemedView";
import React, {useEffect, useState} from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {FlatList, KeyboardAvoidingView, Linking, Platform, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useStore} from "@/hooks/selectedTheme";
import {ThemedText} from "@/components/ThemedText";
import {ThemedScrollView} from "@/components/ThemedScrollView";
import GridView from "@/components/GridView";

export type AboutUsCompProps = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function AboutUsComp({isOpen, setIsOpen}: AboutUsCompProps) {
    const {theme} = useStore()
    const backgroundColor = useThemeColor({light: undefined, dark: undefined}, 'background');
    const color = useThemeColor({light: undefined, dark: undefined}, 'text');

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{flex: 1}}>
            <Portal>
                <Dialog dismissable visible={isOpen}
                        onDismiss={() => setIsOpen(false)} style={{
                    backgroundColor
                }}>
                    <Dialog.Title style={{
                        textAlign: "center",
                        color
                    }}>
                        Know More About Us
                    </Dialog.Title>

                    <Dialog.ScrollArea>
                        <ThemedScrollView style={{
                            paddingVertical: 16,
                            gap: 8,
                        }}>
                            <ThemedText type="subtitle">Metal Collection in London & Surrey</ThemedText>
                            <ThemedText>
                                <ThemedText type="defaultSemiBold">Metal recycling Simvic:{' '}</ThemedText>
                                Scrap Metal Recycling started out as a small family business back in 2006. The name comes from the combined names of the owners – Simon and Victoria. Over the last ten years, we have experienced incredible growth. In merely a decade our client base has grown to over 10,000 clients. We place a great emphasis on our customer service, making sure that all of our clients receive a warm welcome and comprehensive information of all our services. Our prices all depend on stock market listings, and you will always be informed about the current price before we come to pick up your scrap. When picking up large amounts of scrap, we are open to price negotiations, and if you decide to use our services over an extended period of time, we can offer you special prices for scrap in bulk. On top of scrap metal collection, we also offer second-hand car parts on our eBay. Our team is consists of seven drivers, six people on the junkyard, five in the office, and two eBay salespeople responsible for the second-hand car parts. All of them have been in the business for a substantial amount of time and possess a very professional attitude.
                                {"\n"}
                                We are certified car breaking specialists, recognised by the government. You can find us here (https://www.gov.uk/find-vehicle-scrapyard) as well.
                            </ThemedText>
                        </ThemedScrollView>
                    </Dialog.ScrollArea>
                    <View style={{
                        paddingHorizontal:16,
                        paddingBottom:16
                    }}>
                        <Button icon="open-in-new" buttonColor={theme === "light" ? "#0000fe" : "#2f95dc"}
                                textColor={theme === "light" ? "#f6f6f6" : "#282828"} mode="contained"
                                onPress={() => Linking.openURL('https://simvic.co.uk')}>
                            Visit Our Website
                        </Button>
                    </View>
                </Dialog>
                <Toast/>
            </Portal>
        </KeyboardAvoidingView>
    )

}


const styles = StyleSheet.create({
    content: {
        gap: 2,
        padding: 2,
        width: "100%",
    },
    column: {
        gap: 2,
    },
    form: {
        marginTop: 15,
        flexDirection: 'column',
        gap: 5,
    },
    input: {
        width: '100%',
        height: 60,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
    },
});