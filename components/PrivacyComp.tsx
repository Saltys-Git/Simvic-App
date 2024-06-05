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

export type PrivacyCompProps = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const privacyPolicy = "This privacy notice provides information regarding personal information/data that Simvic Ltd processes about you. All information we process complies with the General Data Protection Regulation (GDPR). Simvic Ltd is a licenced recycling facility located at Unit 4 Fordwater Trading Estate, Chertsey, KT16 8HG.  \n" +
    "Why do you store my data?\n" +
    "Simvic Ltd has a legal obligation to store personal data securely in order for us to be compliant with the Scrap Metal Dealers Act (SMDA) 2013. For more information on why we are legally obligated to store your data please visit the following sites: http://www.legislation.gov.uk/ukpga/2013/10/enacted https://www.recyclemetals.org/rules-regulations/scrap-metal-dealer-s-act.html  \n" +
    "What information do we store?\n" +
    "Customers – We store personal information including contact name, address, email address, telephone number and bank account details. Suppliers – We store personal information including contact name, address, email address, telephone number, bank account details and photographic identification (Passport or Drivers licence.  \n" +
    "Who can access my data?\n" +
    "We do not share any information with anyone outside of the organisation. Data will never be passed onto third parties without first acquiring consent.  \n" +
    "Your rights\n" +
    "(1) Right to obtain information – All persons are entitled to view copies of all the data we store. You can request copies of your data at all times. Simvic Ltd will provide this information within 28 days of the initial request. (2) Right to be informed of the data we store – All persons have the right to understand why, how and where we store our information. This information is all detailed within this document, however if you require further information our data controller will provide this upon request. (3) Right to rectification – If data is inaccurate you are entitled to change information, however due to the nature of our business we required to attain certain records for up to 7 years. (4) Right to object us storing information – You have the right to object us taking your personal data, however if you do so you cannot use our services. Simvic Ltd is compliant alongside the Scrap Metal Dealers Act 2013 (SMDA) which requires us to store data to ensure compliance from all suppliers and customers. (5) Right to notified of a data breach – In the rare event of a security data breach, all persons shall be informed within 72 hours without undue delay. The data processor has to disclose the nature of the breach, describe the likely consequences and ensure all persons are informed of the measures being taken to control the breach.  \n" +
    "What are the legitimate obligations for processing data?\n" +
    "Simvic Ltd is the data processors for all customers, suppliers and employees. The processor is answerable for all processing of data contracted by a main data controller who is in charge. The processors of information are compelled to store information in accordance to both GDPR (2018) and SMDA (2013).  \n" +
    "Employee Data\n" +
    "As an employer we process and store all employee data securely which we are legally obligated to store for 6 years. This includes:\n" +
    "\n" +
    "- Name, address, contact details.\n" +
    "- Pay roll details (national insurance number, tax number, pension details).\n" +
    "- Bank account details.\n" +
    "- Medical information.\n" +
    "- Emergency contact details.\n" +
    "\n" +
    "All employee data is stored securely through hard copies filed traditionally and also electronically archived copies. All data stored electronically is protected and encrypted. Only the employer and pay roll have access to this data and do not have permission to share this data externally outside the organisation apart from:\n" +
    "\n" +
    "- Local authorities (HMRC, VAT).\n" +
    "- Police authorities (Investigation of crime).\n" +
    "\n" +
    " \n" +
    "What security measures in place to protect data?\n" +
    "We are in partnership with Tornado Recycling Ltd who is our approved software compliance/data handlers. We have exchanged and approved GDPR policies and can ensure that your data is securely stored through our cloud based servers. All information stored through Tornado Software is encrypted before the upload to the cloud occurs. Security updates are performed constantly to ensure viruses, bugs and malware are constantly intercepted.  \n" +
    "Contacting us in relation to GDPR:\n" +
    "If you wish to discuss your personal data rights further feel free to contact us through the details below. Email: info@simvic.co.uk Post: Unit 4 Fordwater Trading Estate, Chertsey, KT16 8HG. Phone: 01932 570757. If you have any concerns about the way your data is handled, processed or stored you have entitlement to contact the Information Commissioner’s Office (ICO) on 0303 123 1113."


export function PrivacyComp({isOpen, setIsOpen}: PrivacyCompProps) {
    const {theme} = useStore()
    const backgroundColor = useThemeColor({light: undefined, dark: undefined}, 'background');
    const color = useThemeColor({light: undefined, dark: undefined}, 'text');

    return (
            <Portal>
                <Dialog dismissable visible={isOpen}
                        onDismiss={() => setIsOpen(false)} style={{
                    backgroundColor,
                    height: "70%",
                }}>
                    <Dialog.Title style={{
                        textAlign: "center",
                        color
                    }}>
                        Privacy Policy
                    </Dialog.Title>

                    <Dialog.ScrollArea style={{
                        paddingHorizontal:0,
                        paddingVertical:0,
                    }}>
                        <ThemedScrollView style={{
                            padding: 16,
                        }}>
                            <ThemedText>
                                {privacyPolicy}
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