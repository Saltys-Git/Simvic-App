import {View, StyleSheet} from 'react-native';
import {ThemedView} from "@/components/ThemedView";

interface Props<T> {
    data: T[];
    renderItem(item: T,index: number): JSX.Element;
    col?: number;
}


const GridView = <T extends any>(props: Props<T>) => {
    const {data, col = 2, renderItem} = props;
    return (
        <View style={styles.container}>
            {data.map((item, index) => {
                return (
                    // @ts-ignore
                    <ThemedView key={index} style={{width: 100 / col + '%'}}>
                        <ThemedView style={{padding: 5}}>{renderItem(item,index)}</ThemedView>
                    </ThemedView>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {width: '100%', flexDirection: 'row', flexWrap: 'wrap'},
});

export default GridView;