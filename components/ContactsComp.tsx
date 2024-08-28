import {Button, Dialog, Portal, TextInput} from "react-native-paper";
import Toast from "react-native-toast-message";
import {number, object, string} from "yup";
import {useThemeColor} from "@/hooks/useThemeColor";
import {Formik, FormikHelpers} from "formik";
import {ThemedView} from "./ThemedView";
import {useEffect, useState} from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text} from 'react-native';
import {useStore} from "@/hooks/selectedTheme";
import {ThemedText} from "@/components/ThemedText";
import {ThemedScrollView} from "@/components/ThemedScrollView";
import GridView from "@/components/GridView";

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
    const {theme} = useStore()
    const backgroundColor = useThemeColor({light: undefined, dark: undefined}, 'background');
    const color = useThemeColor({light: undefined, dark: undefined}, 'text');

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
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{flex: 1}}>
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
                        Send us feedback
                    </Dialog.Title>

                    <ThemedScrollView style={{
                        paddingBottom: 16,
                        borderBottomLeftRadius: 32,
                        borderBottomRightRadius: 32,
                    }}>
                        <Dialog.Content style={{
                            gap: 8,
                        }}>

                            <Formik
                                initialValues={{
                                    name: "",
                                    email: "",
                                    phoneNumber: "",
                                    message: "",
                                }}
                                validationSchema={emailSchema}
                                onSubmit={(values, actions) => {
                                    handleSubmit(values, actions);
                                }}

                            >
                                {({
                                      errors,
                                      handleChange,
                                      handleBlur,
                                      handleSubmit,
                                      isSubmitting,
                                      values,
                                      touched,
                                      resetForm
                                  }) => (
                                    <ThemedView style={styles.form}>
                                        <TextInput
                                            label="Your Name"
                                            outlineStyle={{borderRadius: 10}}
                                            value={values.name}
                                            mode="outlined"
                                            contentStyle={{
                                                color
                                            }}
                                            /*left={
                                                <TextInput.Icon
                                                    icon={"card-account-details-outline"}
                                                    color={theme === "light" ? "#000" : "#fff"}
                                                    style={{marginTop: 10}}
                                                />
                                            }*/
                                            style={[styles.input, {backgroundColor}]}
                                            onChangeText={handleChange('name')}
                                            onBlur={handleBlur('name')}
                                            error={touched.name && errors.name !== undefined}
                                            disabled={isSubmitting}
                                        />

                                        {touched.name && errors.name &&
                                            <Text style={{
                                                alignSelf: "flex-start",
                                                marginHorizontal: 10,
                                                color: "red"
                                            }}>{errors.name}</Text>
                                        }
                                        <TextInput
                                            label="Email"
                                            outlineStyle={{borderRadius: 10}}
                                            value={values.email}
                                            mode="outlined"
                                            contentStyle={{
                                                color
                                            }}
                                            /*left={
                                                <TextInput.Icon
                                                    icon={"email-outline"}
                                                    color={theme === "light" ? "#000" : "#fff"}
                                                    style={{marginTop: 10}}
                                                />
                                            }*/
                                            style={[styles.input, {backgroundColor}]}
                                            onChangeText={handleChange('email')}
                                            onBlur={handleBlur('email')}
                                            error={touched.email && errors.email !== undefined}
                                            disabled={isSubmitting}
                                        />
                                        {touched.email && errors.email &&
                                            <Text style={{
                                                alignSelf: "flex-start",
                                                marginHorizontal: 10,
                                                color: "red"
                                            }}>{errors.email}</Text>
                                        }
                                        <TextInput
                                            label="Phone Number"
                                            outlineStyle={{borderRadius: 10}}
                                            value={values.phoneNumber}
                                            mode="outlined"
                                            enterKeyHint="next"
                                            maxLength={13}
                                            keyboardType={"numeric"}
                                            onChangeText={handleChange('phoneNumber')}
                                            contentStyle={{
                                                color
                                            }}
                                            /*left={
                                                <TextInput.Icon
                                                    icon={"phone"}
                                                    color={theme === "light" ? "#000" : "#fff"}
                                                    style={{marginTop: 10}}
                                                />
                                            }*/
                                            style={[styles.input, {backgroundColor}]}
                                            onBlur={handleBlur('phoneNumber')}
                                            error={touched.phoneNumber && errors.phoneNumber !== undefined}
                                            disabled={isSubmitting}
                                        />
                                        {touched.phoneNumber && errors.phoneNumber &&
                                            <Text style={{
                                                alignSelf: "flex-start",
                                                marginHorizontal: 10,
                                                color: "red"
                                            }}>{errors.phoneNumber}</Text>
                                        }

                                        <TextInput
                                            label="Your Message"
                                            outlineStyle={{borderRadius: 10}}
                                            value={values.message}
                                            mode="outlined"
                                            enterKeyHint="next"
                                            multiline
                                            numberOfLines={4}
                                            onChangeText={handleChange('message')}
                                            contentStyle={{
                                                color,
                                                height: 152
                                            }}
                                            /*left={
                                                <TextInput.Icon
                                                    icon={"information"}
                                                    color={theme === "light" ? "#000" : "#fff"}
                                                    style={{marginTop: 10}}
                                                />
                                            }*/
                                            style={[styles.input, {backgroundColor}]}
                                            onBlur={handleBlur('message')}
                                            error={touched.message && errors.message !== undefined}
                                            disabled={isSubmitting}
                                        />
                                        {touched.message && errors.message &&
                                            <Text style={{
                                                alignSelf: "flex-start",
                                                marginHorizontal: 10,
                                                color: "red"
                                            }}>{errors.message}</Text>
                                        }
                                        <ThemedView style={{
                                            flexDirection: "row",
                                            gap: 16,
                                            justifyContent: "flex-end",
                                            marginTop: 8
                                        }}>
                                            <Button mode={"contained"} disabled={isSubmitting} loading={isSubmitting}
                                                    onPress={() => {
                                                        setIsOpen(false)
                                                        resetForm()
                                                    }}>Cancel</Button>
                                            <Button mode={"contained"} disabled={isSubmitting} loading={isSubmitting}
                                                    onPress={() => handleSubmit()}>{isSubmitting ? "Sending..." : "Send"}</Button>
                                        </ThemedView>
                                    </ThemedView>
                                )}
                            </Formik>
                        </Dialog.Content>
                    </ThemedScrollView>
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