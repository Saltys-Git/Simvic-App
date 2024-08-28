import {ThemedScrollView} from '@/components/ThemedScrollView';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {Button, DataTable, Dialog, TextInput} from 'react-native-paper';
import {ThemedView} from "@/components/ThemedView";
import {Linking, StyleSheet, Text} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import {useThemeColor} from "@/hooks/useThemeColor";
import {useStore} from "@/hooks/selectedTheme";
import {collection, onSnapshot, orderBy, query, Timestamp} from "@firebase/firestore";
import {FIREBASE_FIRESTORE} from '@/constants/firebaseConfig';
import {Formik, FormikHelpers} from "formik";
import GridView from "@/components/GridView";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {number, object, string} from "yup";
import Toast from "react-native-toast-message";
import {useRouter} from "expo-router";

let userSchema = object({
    name: string().required("Name is a required field"),
    email: string().email("Please enter a valid email").required("Email is a required field"),
    phoneNumber: string().optional().typeError("Please enter a valid Phone number").min(11, "Please enter a valid phone number"),
    postalCode: string().optional(),
    weight: number().required("Please enter how much you want to sell").min(0.5).nonNullable("Please enter how much you want to sell").default(0),
    additionalInformation: string().optional(),
});

const PriceList = () => {
    const router = useRouter();
    const {theme} = useStore()
    const backgroundColor = useThemeColor({light: undefined, dark: undefined}, 'background');
    const color = useThemeColor({light: undefined, dark: undefined}, 'text');
    const [materials, setMaterials] = useState<[
        { name: string, value: boolean },
        { name: string, value: boolean },
        { name: string, value: boolean },
        { name: string, value: boolean },
        { name: string, value: boolean },
        { name: string, value: boolean },
        { name: string, value: boolean },
        { name: string, value: boolean },
        { name: string, value: boolean },
        { name: string, value: boolean },
    ]>([
        {name: "Copper", value: false},
        {name: "Cables", value: false},
        {name: "Brass", value: false},
        {name: "Lead", value: false},
        {name: "Aluminium", value: false},
        {name: "Scrap Car", value: false},
        {name: "Stainless Steel", value: false},
        {name: "Bronze", value: false},
        {name: "Zinc", value: false},
        {name: "Others", value: false},
    ])
    const [acceptTerm, setAcceptTerm] = useState(false)

    async function handleSubmit(
        values: {
            name: string;
            email: string;
            phoneNumber: string;
            postalCode: string;
            weight: string;
            additionalInformation: string;
        },
        actions: FormikHelpers<{
            name: string;
            email: string;
            phoneNumber: string;
            postalCode: string;
            weight: string;
            additionalInformation: string;
        }>) {

        function getMaterials() {
            let materialNames = ""
            materials.forEach((item) => {
                if (item.value) {
                    materialNames += item.name + ", ";
                }
            })
            return materialNames.substring(0, materialNames.length - 2) + "."
        }

        const materialNames = getMaterials()
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("email", values.email);
        formData.append("phoneNumber", values.phoneNumber);
        formData.append("postalCode", values.postalCode);
        formData.append("materials", materialNames);
        formData.append("weight", values.weight);
        formData.append("additionalInformation", values.additionalInformation);
        formData.append("acceptTerm", acceptTerm ? "accepted" : "rejected");


        const response = await fetch("https://simvic-admin.vercel.app/api/quote", {
            method: "POST",
            body: formData,
        });
        if (!response.ok) {
            actions.setSubmitting(false)
            Toast.show({
                type: 'error',
                text1: "Error",
                text2: "Can't process the request at the moment",
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
                text2: 'Your quote request submitted successfully',
                text1Style: {
                    fontSize: 14
                },
                text2Style: {
                    fontSize: 14
                },
                topOffset: 60,
            });
            actions.resetForm()
            setMaterials([
                {name: "Copper", value: false},
                {name: "Cables", value: false},
                {name: "Brass", value: false},
                {name: "Lead", value: false},
                {name: "Aluminium", value: false},
                {name: "Scrap Car", value: false},
                {name: "Stainless Steel", value: false},
                {name: "Bronze", value: false},
                {name: "Zinc", value: false},
                {name: "Others", value: false},
            ])
            setAcceptTerm(false)
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
        <ThemedScrollView>
            <ThemedView style={styles.stepContainer}>
                <ThemedText style={{
                    width: "100%",
                    alignItems: "center",
                    textAlign: "center",
                }} type="subtitle">We will contact you soon with the quote</ThemedText>
                <Formik
                    initialValues={{
                        name: "",
                        email: "",
                        phoneNumber: "",
                        postalCode: "",
                        weight: "",
                        additionalInformation: "",
                    }}
                    validationSchema={userSchema}
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
                          touched
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
                                label="Post Code"
                                outlineStyle={{borderRadius: 10}}
                                value={values.postalCode}
                                mode="outlined"
                                enterKeyHint="next"
                                onChangeText={handleChange('postalCode')}
                                contentStyle={{
                                    color
                                }}
                                /*left={
                                    <TextInput.Icon
                                        icon={"map"}
                                        color={theme === "light" ? "#000" : "#fff"}
                                        style={{marginTop: 10}}
                                    />
                                }*/
                                style={[styles.input, {backgroundColor}]}
                                onBlur={handleBlur('postalCode')}
                                error={touched.postalCode && errors.postalCode !== undefined}
                                disabled={isSubmitting}
                            />
                            {touched.postalCode && errors.postalCode &&
                                <Text style={{
                                    alignSelf: "flex-start",
                                    marginHorizontal: 10,
                                    color: "red"
                                }}>{errors.postalCode}</Text>
                            }

                            <ThemedView style={{marginVertical: 16}}>
                                <ThemedText type={"subtitle"}>
                                    What do you have for sale?
                                </ThemedText>
                                <GridView
                                    data={materials}
                                    col={2}
                                    renderItem={(item, index) => (
                                        <BouncyCheckbox
                                            size={25}
                                            fillColor={theme === "light" ? "#0000fe" : "#2f95dc"}
                                            unFillColor={theme === "light" ? "#ffffff" : "#000000"}
                                            text={item.name}
                                            textStyle={{
                                                textDecorationLine: "none",
                                                color,
                                                fontWeight: "bold",
                                                fontSize: 16,
                                                width: 130
                                            }}
                                            innerIconStyle={{borderWidth: 2}}
                                            style={{
                                                marginTop: 10,
                                                marginHorizontal: 10,
                                                alignSelf: "flex-start",
                                                width: "45%"
                                            }}
                                            isChecked={item.value}
                                            disabled={isSubmitting}
                                            onPress={() => {
                                                setMaterials(prevState => {
                                                    prevState[index].value = !prevState[index].value
                                                    return [...prevState]
                                                })
                                            }}
                                        />
                                    )}
                                />
                            </ThemedView>


                            <TextInput
                                label="How Many KG"
                                outlineStyle={{borderRadius: 10}}
                                value={values.weight}
                                mode="outlined"
                                enterKeyHint="next"
                                maxLength={5}
                                keyboardType={"numeric"}
                                onChangeText={handleChange('weight')}
                                contentStyle={{
                                    color
                                }}
                                /*left={
                                    <TextInput.Icon
                                        icon={"weight-kilogram"}
                                        color={theme === "light" ? "#000" : "#fff"}
                                        style={{marginTop: 10}}
                                    />
                                }*/
                                style={[styles.input, {backgroundColor}]}
                                onBlur={handleBlur('weight')}
                                error={touched.weight && errors.weight !== undefined}
                                disabled={isSubmitting}
                            />
                            {touched.weight && errors.weight &&
                                <Text style={{
                                    alignSelf: "flex-start",
                                    marginHorizontal: 10,
                                    color: "red"
                                }}>{errors.weight}</Text>
                            }
                            <TextInput
                                label="Additional Information"
                                outlineStyle={{borderRadius: 10}}
                                value={values.additionalInformation}
                                mode="outlined"
                                enterKeyHint="next"
                                multiline
                                numberOfLines={4}
                                onChangeText={handleChange('additionalInformation')}
                                contentStyle={{
                                    color,
                                }}
                                textColor={"#800101"}
                                /*left={
                                    <TextInput.Icon
                                        icon={"information"}
                                        color={theme === "light" ? "#000" : "#fff"}
                                        style={{marginTop: 10}}
                                    />
                                }*/
                                style={[styles.input, {backgroundColor}]}
                                onBlur={handleBlur('additionalInformation')}
                                error={touched.additionalInformation && errors.additionalInformation !== undefined}
                                disabled={isSubmitting}
                            />
                            {touched.additionalInformation && errors.additionalInformation &&
                                <Text style={{
                                    alignSelf: "flex-start",
                                    marginHorizontal: 10,
                                    color: "red"
                                }}>{errors.additionalInformation}</Text>
                            }
                            <BouncyCheckbox
                                size={25}
                                fillColor={theme === "light" ? "#0000fe" : "#2f95dc"}
                                unFillColor={backgroundColor}
                                text="I accept my data to be used to process this enquiry"
                                textStyle={{
                                    textDecorationLine: "none",
                                    color,
                                    fontWeight: "bold",
                                    fontSize: 16,
                                }}
                                innerIconStyle={{borderWidth: 2}}
                                style={{marginTop: 10, marginHorizontal: 10, alignSelf: "flex-start"}}
                                isChecked={acceptTerm}
                                disabled={isSubmitting}
                                onPress={() => {
                                    setAcceptTerm(!acceptTerm)
                                }}
                            />
                            <ThemedView style={{
                                flexDirection: "row",
                                gap: 16,
                                justifyContent: "flex-end",
                                marginTop: 8
                            }}>
                                <Button mode={"contained"} disabled={isSubmitting} loading={isSubmitting}
                                        onPress={() => {
                                            setMaterials([
                                                {name: "Copper", value: false},
                                                {name: "Cables", value: false},
                                                {name: "Brass", value: false},
                                                {name: "Lead", value: false},
                                                {name: "Aluminium", value: false},
                                                {name: "Scrap Car", value: false},
                                                {name: "Stainless Steel", value: false},
                                                {name: "Bronze", value: false},
                                                {name: "Zinc", value: false},
                                                {name: "Others", value: false},
                                            ])
                                            setAcceptTerm(false)
                                            router.back()
                                        }}>Cancel</Button>
                                <Button mode={"contained"} disabled={isSubmitting} loading={isSubmitting}
                                        onPress={() => handleSubmit()}>{isSubmitting ? "Sending..." : "Send"}</Button>
                            </ThemedView>
                        </ThemedView>
                    )}
                </Formik>
            </ThemedView>
        </ThemedScrollView>
    );
};

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        justifyContent: "center"
    },
    stepContainer: {
        gap: 4,
        marginBottom: 8,
        padding: 16
    },
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

export default PriceList;