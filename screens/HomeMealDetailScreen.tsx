import {
    NavigationProp,
    RouteProp,
    useNavigation
} from '@react-navigation/native';
import { FC, useLayoutEffect } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '../components/UIComponents/IconButton';

import HomeMealDetail from '../components/HomeComponents/HomeMealDetail';
import { RootState } from '../store/redux/Store';
import {
    addFavorite,
    removeFavorite
} from '../store/redux/slice/CategorySlice';
import { RootStackParamList } from '../types/app.types';

type MealDetailScreenProps = {
    route: RouteProp<RootStackParamList, 'HomeMealDetail'>;
};

const HomeMealDetailScreen: FC<MealDetailScreenProps> = ({ route }) => {
    const meal = route.params.meal;
    const dispatch = useDispatch(); // Get dispatch function
    const favoriteMealsId = useSelector(
        (state: RootState) => state.categories.favorites
    );

    const isMealFavorite = favoriteMealsId.includes(meal.id);
    const categoriesState = useSelector((state: RootState) => state.categories);

    const navigation =
        useNavigation<NavigationProp<RootStackParamList, 'HomeMealDetail'>>();

    const changeFavoriteMealHandler = () => {
        if (isMealFavorite) {
            dispatch(removeFavorite({ id: meal.id }));
        } else {
            dispatch(addFavorite({ id: meal.id }));
        }
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            title: meal?.name,
            headerRight: () => (
                <IconButton
                    iconName={meal ? 'star' : 'star-outline'}
                    color="white"
                    onTap={changeFavoriteMealHandler}
                />
            )
        });
    }, [favoriteMealsId, navigation, meal?.name]);

    if (!meal) {
        return <Text>No meal found!</Text>; // Handle the case where meal is not found
    }

    return (
        <ScrollView style={styles.rootContainer}>
            <Image
                source={{ uri: meal.image }}
                resizeMode="cover"
                style={styles.image}
            />
            <Text style={styles.title}>{meal.name}</Text>
            <View>
                <HomeMealDetail meal={meal} textStyle={styles.textStyle} />
            </View>
            <View style={styles.listOuterContainer}>
                <View style={styles.listInnerContainer}></View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    rootContainer: {
        marginBottom: 20
    },
    image: {
        width: '100%',
        height: 250,
        borderRadius: 8
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        margin: 8
    },
    textStyle: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold'
    },
    listInnerContainer: {
        maxWidth: '80%'
    },
    listOuterContainer: {
        alignItems: 'center'
    }
});

export default HomeMealDetailScreen;
