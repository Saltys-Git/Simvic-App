import {ThemedScrollView} from '@/components/ThemedScrollView';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {DataTable} from 'react-native-paper';
import {ThemedView} from "@/components/ThemedView";
import {Linking, StyleSheet} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import {useThemeColor} from "@/hooks/useThemeColor";
import {useStore} from "@/hooks/selectedTheme";
import {collection, onSnapshot, orderBy, query, Timestamp} from "@firebase/firestore";
import {FIREBASE_FIRESTORE} from '@/constants/firebaseConfig';

const PriceList = () => {
    const {theme} = useStore()
    const color = useThemeColor({light: "#000", dark: "#fff"}, 'text');
    const [page, setPage] = React.useState<number>(0);
    const [numberOfItemsPerPageList] = React.useState([5, 10, 20, 50, 100]);
    const [itemsPerPage, onItemsPerPageChange] = React.useState(
        numberOfItemsPerPageList[0]
    );

    const [items, setItems] = useState<{
        key: string,
        name: string,
        from: number,
        to: number,
        updatedAt: Timestamp,
    }[]>([]);

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, items.length);

    useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);

    useEffect(() => {
        const q = query(collection(FIREBASE_FIRESTORE, `PriceList`),
            orderBy("id", "asc")
        );
        return onSnapshot(q, r => {
            setItems([])
            if (r.empty) return
            r.docs.forEach(doc => {
                if (!doc.exists()) return
                setItems((prevState) => {
                    return [...prevState, {
                        key: doc.id,
                        name: doc.data().name,
                        from: doc.data().from,
                        to: doc.data().to,
                        updatedAt: doc.data().updatedAt,
                    }]
                })
            })
        }, (error) => {
            console.warn(error.code)
        })
    }, [])

    return (
        <ThemedScrollView>
            <ThemedView style={styles.stepContainer}>
                <ThemedView style={styles.titleContainer}>
                    <ThemedText type="title">Scrap metal prices</ThemedText>
                </ThemedView>
                <ThemedText type="subtitle">All prices are subject to change without prior notice.</ThemedText>
                <ThemedText>
                    <ThemedText type="defaultSemiBold">Please Note:{' '}</ThemedText>
                    The following information represents Simvic yard buying prices.
                    For information on high-volume or long-distance purchases, please call us immediately at {" "}
                    <ThemedText type="defaultSemiBold"
                                onPress={() => Linking.openURL('tel:0776-363-0404')}>0776-363-0404</ThemedText>
                    .
                </ThemedText>
            </ThemedView>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title textStyle={[{color}]}>Metal Name</DataTable.Title>
                    <DataTable.Title numeric textStyle={[{color}]}>From</DataTable.Title>
                    <DataTable.Title numeric textStyle={[{color}]}>To</DataTable.Title>
                    <DataTable.Title numeric textStyle={[{color}]}>Updated On</DataTable.Title>
                </DataTable.Header>

                {items.slice(from, to).map((item) => (
                    <DataTable.Row key={item.key}>
                        <DataTable.Cell textStyle={[{color}]}>{item.name}</DataTable.Cell>
                        <DataTable.Cell numeric textStyle={[{color}]}>£{item.from}/KG</DataTable.Cell>
                        <DataTable.Cell numeric textStyle={[{color}]}>£{item.to}/KG</DataTable.Cell>
                        <DataTable.Cell numeric textStyle={[{color}]}>{item.updatedAt.toDate().toLocaleDateString()}</DataTable.Cell>
                    </DataTable.Row>
                ))}

                <DataTable.Pagination
                    page={page}
                    numberOfPages={Math.ceil(items.length / itemsPerPage)}
                    onPageChange={(page) => setPage(page)}
                    label={`${from + 1}-${to} of ${items.length}`}
                    numberOfItemsPerPageList={numberOfItemsPerPageList}
                    numberOfItemsPerPage={itemsPerPage}
                    onItemsPerPageChange={onItemsPerPageChange}
                    showFastPaginationControls
                    selectPageDropdownLabel={'Rows per page'}
                    theme={theme === "light" ? {
                            "colors": {
                                "primary": "rgb(0,0,254)",
                                "onPrimary": "rgb(255, 255, 255)",
                                "primaryContainer": "rgb(240, 219, 255)",
                                "onPrimaryContainer": "rgb(44, 0, 81)",
                                "secondary": "rgb(102, 90, 111)",
                                "onSecondary": "rgb(255, 255, 255)",
                                "secondaryContainer": "rgb(237, 221, 246)",
                                "onSecondaryContainer": "rgb(33, 24, 42)",
                                "tertiary": "rgb(128, 81, 88)",
                                "onTertiary": "rgb(255, 255, 255)",
                                "tertiaryContainer": "rgb(255, 217, 221)",
                                "onTertiaryContainer": "rgb(50, 16, 23)",
                                "error": "rgb(186, 26, 26)",
                                "onError": "rgb(255, 255, 255)",
                                "errorContainer": "rgb(255, 218, 214)",
                                "onErrorContainer": "rgb(65, 0, 2)",
                                "background": "rgb(255, 251, 255)",
                                "onBackground": "rgb(29, 27, 30)",
                                "surface": "rgb(255, 251, 255)",
                                "onSurface": "rgb(29, 27, 30)",
                                "surfaceVariant": "rgb(233, 223, 235)",
                                "onSurfaceVariant": "rgb(74, 69, 78)",
                                "outline": "rgb(124, 117, 126)",
                                "outlineVariant": "rgb(204, 196, 206)",
                                "shadow": "rgb(0, 0, 0)",
                                "scrim": "rgb(0, 0, 0)",
                                "inverseSurface": "rgb(50, 47, 51)",
                                "inverseOnSurface": "rgb(245, 239, 244)",
                                "inversePrimary": "rgb(220, 184, 255)",
                                "elevation": {
                                    "level0": "transparent",
                                    "level1": "rgb(248, 242, 251)",
                                    "level2": "rgb(244, 236, 248)",
                                    "level3": "rgb(240, 231, 246)",
                                    "level4": "rgb(239, 229, 245)",
                                    "level5": "rgb(236, 226, 243)"
                                },
                                "surfaceDisabled": "rgba(29, 27, 30, 0.12)",
                                "onSurfaceDisabled": "rgba(29, 27, 30, 0.38)",
                                "backdrop": "rgba(51, 47, 55, 0.4)"
                            }
                        } : {
                            "colors": {
                                "primary": "rgb(47,149,220)",
                                "onPrimary": "rgb(71, 12, 122)",
                                "primaryContainer": "rgb(95, 43, 146)",
                                "onPrimaryContainer": "rgb(240, 219, 255)",
                                "secondary": "rgb(208, 193, 218)",
                                "onSecondary": "rgb(54, 44, 63)",
                                "secondaryContainer": "rgb(77, 67, 87)",
                                "onSecondaryContainer": "rgb(237, 221, 246)",
                                "tertiary": "rgb(243, 183, 190)",
                                "onTertiary": "rgb(75, 37, 43)",
                                "tertiaryContainer": "rgb(101, 58, 65)",
                                "onTertiaryContainer": "rgb(255, 217, 221)",
                                "error": "rgb(255, 180, 171)",
                                "onError": "rgb(105, 0, 5)",
                                "errorContainer": "rgb(147, 0, 10)",
                                "onErrorContainer": "rgb(255, 180, 171)",
                                "background": "rgb(29, 27, 30)",
                                "onBackground": "rgb(231, 225, 229)",
                                "surface": "rgb(29, 27, 30)",
                                "onSurface": "rgb(231, 225, 229)",
                                "surfaceVariant": "rgb(74, 69, 78)",
                                "onSurfaceVariant": "rgb(204, 196, 206)",
                                "outline": "rgb(150, 142, 152)",
                                "outlineVariant": "rgb(74, 69, 78)",
                                "shadow": "rgb(0, 0, 0)",
                                "scrim": "rgb(0, 0, 0)",
                                "inverseSurface": "rgb(231, 225, 229)",
                                "inverseOnSurface": "rgb(50, 47, 51)",
                                "inversePrimary": "rgb(120, 69, 172)",
                                "elevation": {
                                    "level0": "transparent",
                                    "level1": "rgb(39, 35, 41)",
                                    "level2": "rgb(44, 40, 48)",
                                    "level3": "rgb(50, 44, 55)",
                                    "level4": "rgb(52, 46, 57)",
                                    "level5": "rgb(56, 49, 62)"
                                },
                                "surfaceDisabled": "rgba(231, 225, 229, 0.12)",
                                "onSurfaceDisabled": "rgba(231, 225, 229, 0.38)",
                                "backdrop": "rgba(51, 47, 55, 0.4)"
                            }
                        }}

                />
            </DataTable>
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
        gap: 8,
        marginBottom: 8,
        padding: 16
    }
});

export default PriceList;