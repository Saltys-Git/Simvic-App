import {Image, Pressable, StyleSheet} from 'react-native';

import {HelloWave} from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {ThemedSafeAreaView} from "@/components/ThemedSafeAreaView";
import {Link} from "expo-router";
import {ThemedSurface} from "@/components/ThemedSurface";
import LottieView from "lottie-react-native";
import {useStore} from "@/hooks/selectedTheme";
import {useState} from "react";
import {GetAQuoteComp} from "@/components/GetAQuoteComp";
import GridView from "@/components/GridView";
import {ContactComp} from "@/components/ContactsComp";
import {AboutUsComp} from "@/components/AboutUsComp";
import {PrivacyComp} from "@/components/PrivacyComp";
import {FullScreenComp} from "@/components/FullScreenComp";

export default function HomeScreen() {
    const [isQuoteDialOpen, setIsQuoteDialOpen] = useState(false)
    const [isContactDialOpen, setIsContactDialOpen] = useState(false)
    const [isAboutDialOpen, setIsAboutDialOpen] = useState(false)
    const [isPrivacyDialOpen, setIsPrivacyDialOpen] = useState(false)


    const options = [
        {title:"Price List",icon: require('@/assets/lottie/prices.json'),link:"/priceList"},
        {title:"Services",icon: require('@/assets/lottie/educate.json'),link:"/services"},
        {title:"Get a Quote",icon: require('@/assets/lottie/quote.json'),link:"/getAQuote"},
        {title:"Message Us",icon: require('@/assets/lottie/messages.json'),link:"/", onPress: ()=> setIsContactDialOpen(true)},
        {title:"About Us",icon: require('@/assets/lottie/about-us.json'),link:"/", onPress: ()=> setIsAboutDialOpen(true)},
        {title:"Privacy Policy",icon: require('@/assets/lottie/privacy.json'),link:"/", onPress: ()=> setIsPrivacyDialOpen(true)},
    ]

    return (
        <ThemedSafeAreaView>
            <ParallaxScrollView
                headerBackgroundColor={{light: '#A1CEDC', dark: '#1D3D47'}}
                headerImage={
                    <Image
                        source={require('@/assets/images/simvic-home-pic.png')}
                        style={styles.reactLogo}
                    />
                }>
                <ThemedView style={styles.container}>
                    <ThemedView style={styles.titleContainer}>
                        <ThemedText type="title">Welcome!</ThemedText>
                        <HelloWave/>
                    </ThemedView>
                    <GridView
                        data={options}
                        col={2}
                        renderItem={(item) => (
                            <Link href={item.link} asChild>
                                <Pressable style={{flex:1}} onPress={item.onPress}>
                                    <ThemedSurface elevation={1} style={styles.box} lightColor={"#f6f6f6"} darkColor={"#595959"}>
                                        <LottieView
                                            autoPlay
                                            source={item.icon}
                                            style={{
                                                aspectRatio: "1.4/1",
                                                width: "100%",
                                                alignSelf: "center",
                                            }}/>
                                        <ThemedText type="subtitle">{item.title}</ThemedText>
                                    </ThemedSurface>
                                </Pressable>
                            </Link>
                        )}
                    />
                </ThemedView>
                <GetAQuoteComp isOpen={isQuoteDialOpen} setIsOpen={setIsQuoteDialOpen} />
                <ContactComp isOpen={isContactDialOpen} setIsOpen={setIsContactDialOpen} />
                <AboutUsComp isOpen={isAboutDialOpen} setIsOpen={setIsAboutDialOpen} />
                <PrivacyComp isOpen={isPrivacyDialOpen} setIsOpen={setIsPrivacyDialOpen} />
                <FullScreenComp/>
            </ParallaxScrollView>
        </ThemedSafeAreaView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        justifyContent: "center"
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
        paddingHorizontal: 16
    },
    reactLogo: {
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        paddingVertical: 32,
        paddingHorizontal:8,
        gap: 16,
    },
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
