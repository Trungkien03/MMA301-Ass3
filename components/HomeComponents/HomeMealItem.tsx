import { NavigationProp, useNavigation } from '@react-navigation/native';
import { FC } from 'react';
import {
    Image,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { OrchidItem } from '../../store/redux/slice/CategorySlice';
import { RootStackParamList } from '../../types/app.types';
import HomeMealDetail from './HomeMealDetail';

type MealItemProps = {
    itemData: OrchidItem;
};

const HomeMealItem: FC<MealItemProps> = ({ itemData }) => {
    const { id, image, name } = itemData;
    const navigation =
        useNavigation<NavigationProp<RootStackParamList, 'HomeMealOverview'>>();
    const selectMealHandler = () => {
        navigation.navigate('HomeMealDetail', { meal: itemData });
    };
    return (
        <View style={styles.mealItem}>
            <Pressable
                android_ripple={{ color: '#ccc' }}
                style={({ pressed }) => (pressed ? styles.buttonPressed : null)}
                onPress={selectMealHandler}
            >
                <View style={styles.innerContainer}>
                    <Image
                        style={styles.image}
                        source={{ uri: image }}
                        resizeMode="cover"
                    />
                    <Text style={styles.title}>{name}</Text>
                    <HomeMealDetail meal={itemData} />
                </View>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    mealItem: {
        margin: 16,
        borderRadius: 8,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
        backgroundColor: 'white',
        elevation: 4,
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowOffset: { width: 2, height: 2 },
        shadowRadius: 8
    },
    innerContainer: {
        borderRadius: 8,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: 250,
        borderRadius: 8 // If you want rounded corners for the image
    },
    title: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
        margin: 8
    },
    buttonPressed: {
        opacity: 0.5
    }
});

export default HomeMealItem;
