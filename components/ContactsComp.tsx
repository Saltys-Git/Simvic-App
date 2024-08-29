import {Button, Dialog, Portal} from "react-native-paper";
import Toast from "react-native-toast-message";
import {object, string} from "yup";
import {useThemeColor} from "@/hooks/useThemeColor";
import {Formik, FormikHelpers} from "formik";
import {ThemedView} from "./ThemedView";
import {KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput} from 'react-native';
import {ThemedScrollView} from "@/components/ThemedScrollView";
import {useEffect, useState} from "react";

export type ContactCompProps = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

let emailSchema = object({
    name: string().required("Name is a required field"),
    email: string().email("Please enter a valid email").required("Email is a required field"),
    phoneNumber: string().optional().typeError("Please enter a valid Phone number").min(11, "Please enter a valid phone number"),
    message: string().required("Please enter your message"),
});

export function ContactComp({isOpen, setIsOpen}: ContactCompProps) {
    const backgroundColor = useThemeColor({light: undefined, dark: undefined}, 'background');
    const color = useThemeColor({light: undefined, dark: undefined}, 'text');
    const [formData, setFormData] = useState<{
        name: string,
        email: string,
        phone: string,
        message: string,
    }>({
        name: "",
        email: "",
        phone: "",
        message: "",
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    useEffect(() => {

    }, []);


    async function handleSubmit(
        values: {
            name: string;
            email: string;
            phoneNumber: string;
            message: string;
        },
        actions: FormikHelpers<{
            name: string;
            email: string;
            phoneNumber: string;
            message: string;
        }>) {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("email", values.email);
        formData.append("phoneNumber", values.phoneNumber);
        formData.append("message", values.message);
        const response = await fetch("https://simvic-admin.vercel.app/api/contact", {
            method: "POST",
            body: formData,
        });
        if (!response.ok) {
            actions.setSubmitting(false)
            Toast.show({
                type: 'error',
                text1: "Error",
                text2: "Can't process the request",
                text1Style: {
                    fontSize: 14
                },
                text2Style: {
                    fontSize: 14
                },
                topOffset: 60,
            });
            return;
        }
        const apiRes = await response.json();
        actions.setSubmitting(false)
        if (apiRes.success) {
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Your message sent successfully',
                text1Style: {
                    fontSize: 14
                },
                text2Style: {
                    fontSize: 14
                },
                topOffset: 60,
            });
            actions.resetForm()
            setIsOpen(false)
        } else {
            Toast.show({
                type: 'error',
                text1: "Error",
                text2: 'Something went wrong please try again.',
                text1Style: {
                    fontSize: 14
                },
                text2Style: {
                    fontSize: 14
                },
                topOffset: 60,
            });
        }
    }


    return (
            <Portal>
                <Dialog dismissable={false} visible={isOpen}
                        onDismiss={() => {
                            setIsOpen(false)

                        }} style={{
                    backgroundColor
                }}>
                    <Dialog.Title style={{
                        textAlign: "center",
                        color
                    }}>
                        Send us feedback update 5
                    </Dialog.Title>
                        <Dialog.Content style={{
                            paddingBottom: 16,
                            borderBottomLeftRadius: 32,
                            borderBottomRightRadius: 32,
                            gap: 8,
                        }}>

                                    <ThemedView style={styles.form}>
                                        <TextInput
                                            placeholder="Your Name"
                                            value={formData.name}
                                            placeholderTextColor={color}
                                            style={[styles.input, {backgroundColor, borderColor:color, color}]}
                                            onChangeText={(e)=>{
                                                setFormData((prev)=>{
                                                    prev.name=e
                                                    return {...prev}
                                                })
                                            }}
                                            editable={!isSubmitting}
                                        />

                                        {/*{touched.name && errors.name &&
                                            <Text style={{
                                                alignSelf: "flex-start",
                                                marginHorizontal: 10,
                                                color: "red"
                                            }}>{errors.name}</Text>
                                        }*/}
                                        <TextInput
                                            placeholder="Email"
                                            value={formData.email}
                                            placeholderTextColor={
                                                color
                                            }
                                            style={[styles.input, {backgroundColor, borderColor:color, color}]}
                                            onChangeText={(e)=>{
                                                setFormData((prev)=>{
                                                    prev.email = e
                                                    return {...prev}
                                                })
                                            }}
                                            editable={!isSubmitting}
                                        />
                                        {/*{touched.email && errors.email &&
                                            <Text style={{
                                                alignSelf: "flex-start",
                                                marginHorizontal: 10,
                                                color: "red"
                                            }}>{errors.email}</Text>
                                        }*/}
                                        <TextInput
                                            placeholder="Phone Number"
                                            value={formData.phone}
                                            enterKeyHint="next"
                                            maxLength={13}
                                            keyboardType={"numeric"}
                                            onChangeText={(e)=>{
                                                setFormData((prev)=>{
                                                    prev.phone = e
                                                    return {...prev}
                                                })
                                            }}
                                            placeholderTextColor={
                                                color
                                            }
                                            style={[styles.input, {backgroundColor, borderColor:color, color}]}
                                            editable={!isSubmitting}
                                        />
                                        {/*{touched.phoneNumber && errors.phoneNumber &&
                                            <Text style={{
                                                alignSelf: "flex-start",
                                                marginHorizontal: 10,
                                                color: "red"
                                            }}>{errors.phoneNumber}</Text>
                                        }*/}

                                        <TextInput
                                            placeholder="Your Message"
                                            value={formData.message}
                                            enterKeyHint="next"
                                            multiline
                                            numberOfLines={4}
                                            onChangeText={(e)=>{
                                                setFormData((prev)=>{
                                                    prev.message = e
                                                    return {...prev}
                                                })
                                            }}
                                            placeholderTextColor={color}
                                            style={[styles.input, {backgroundColor, borderColor:color, color, height:106, textAlignVertical:"top", paddingTop:12}]}
                                            editable={!isSubmitting}
                                        />
                                        {/*{touched.message && errors.message &&
                                            <Text style={{
                                                alignSelf: "flex-start",
                                                marginHorizontal: 10,
                                                color: "red"
                                            }}>{errors.message}</Text>
                                        }*/}
                                        <ThemedView style={{
                                            flexDirection: "row",
                                            gap: 16,
                                            justifyContent: "flex-end",
                                            marginTop: 8
                                        }}>
                                            <Button mode={"contained"} disabled={isSubmitting} loading={isSubmitting}
                                                    onPress={() => {
                                                        setIsOpen(false)
                                                        setFormData({
                                                            name:"",
                                                            email:"",
                                                            phone:"",
                                                            message:""
                                                        })
                                                    }}>Cancel</Button>
                                            <Button mode={"contained"} disabled={isSubmitting} loading={isSubmitting}
                                                    onPress={() => console.log("pressed")}>{isSubmitting ? "Sending..." : "Send"}</Button>
                                        </ThemedView>
                                    </ThemedView>
                        </Dialog.Content>
                </Dialog>
                <Toast/>
            </Portal>
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
        padding: 8,
        justifyContent: 'center',
        borderRadius: 12,
        borderWidth: 1,
        borderStyle:"solid",
    },
});