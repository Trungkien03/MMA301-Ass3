import { FlatList, StyleSheet, View } from 'react-native';

import { FC } from 'react';
import { OrchidItem } from '../../store/redux/slice/CategorySlice';
import HomeMealItem from './HomeMealItem';

type MealListProps = {
    displayMeals: OrchidItem[];
};

const HomeMealList: FC<MealListProps> = ({ displayMeals }) => {
    const renderMealItem = ({ item }: { item: OrchidItem }) => {
        return <HomeMealItem itemData={item} />;
    };
    return (
        <View style={styles.container}>
            <FlatList
                data={displayMeals}
                keyExtractor={(item) => item.id}
                renderItem={renderMealItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    }
});

export default HomeMealList;
