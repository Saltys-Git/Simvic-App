import {ThemedView} from "./ThemedView";
import React, {useEffect, useState} from "react";
import {StyleSheet} from 'react-native';
import {ThemedText} from "@/components/ThemedText";
import {doc, getDoc} from "@firebase/firestore";
import {FIREBASE_FIRESTORE} from "@/constants/firebaseConfig";

export function FullScreenComp() {
    const [state, setState] = useState(false)
    const [text, setText] = useState("")

    useEffect(() => {
        (async()=>{
            const docRef = doc(FIREBASE_FIRESTORE, "Seen", "info");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setText(docSnap.data().text)
                setState(docSnap.data().state)
            }
        })()
    }, [])
    return (
        <ThemedView style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            display: state ?"flex":"none",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <ThemedText type={"title"}>
                {text}
            </ThemedText>
        </ThemedView>
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