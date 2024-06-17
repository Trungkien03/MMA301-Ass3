import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { OrchidItem } from '../../store/redux/slice/CategorySlice';

type HomeMealDetailProps = {
    meal: OrchidItem;
    textStyle?: {};
};

const HomeMealDetail: FC<HomeMealDetailProps> = ({ meal, textStyle }) => {
    const { origin, rating, weight } = meal;
    return (
        <View style={styles.details}>
            <Text style={[styles.detailsItem, textStyle]}>{origin}m</Text>
            <Text style={[styles.detailsItem, textStyle]}>
                {rating.toUpperCase()}
            </Text>
            <Text style={[styles.detailsItem, textStyle]}>{weight}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    details: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8
    },
    detailsItem: {
        marginHorizontal: 5,
        fontSize: 12
    }
});

export default HomeMealDetail;
