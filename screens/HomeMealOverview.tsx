import {
    NavigationProp,
    RouteProp,
    useNavigation
} from '@react-navigation/native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, View } from 'react-native';
import HomeMealList from '../components/HomeComponents/HomeMealList';
import { RootState } from '../store/redux/Store';
import { RootStackParamList } from '../types/app.types';
import IconButton from '../components/UIComponents/IconButton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
    deleteCategoryAsync,
    fetchCategories
} from '../store/redux/api/CategoryApis';
import { useAppDispatch } from '../hooks/useDispatch';

type HomeMealOverviewProps = {
    route: RouteProp<RootStackParamList, 'HomeMealOverview'>;
    navigation: NavigationProp<RootStackParamList, 'HomeMealOverview'>;
};

const HomeMealOverview: React.FC<HomeMealOverviewProps> = ({ route }) => {
    const dispatch = useAppDispatch();
    const categoriesState = useSelector((state: RootState) => state.categories);
    const { categoryId } = route.params;
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    // Find the category that matches the categoryId
    const selectedCategory = categoriesState.allCategories.find(
        (category) => category.id === categoryId
    );

    // Display meals from the selected category, if found
    const displayMeals = selectedCategory ? selectedCategory.items : [];

    useEffect(() => {
        navigation.setOptions({
            title: selectedCategory?.name || 'Meals Overview',
            headerRight: () => (
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around'
                    }}
                >
                    <View
                        style={{
                            paddingHorizontal: 5
                        }}
                    >
                        <IconButton
                            onTap={handleDeleteCategory}
                            iconName="trash-bin"
                            color="#fff"
                        />
                    </View>

                    <View
                        style={{
                            paddingHorizontal: 5
                        }}
                    >
                        <IconButton
                            onTap={() =>
                                navigation.navigate('AddCategoryItem', {
                                    categoryId: selectedCategory?.id ?? ''
                                })
                            }
                            iconName="add-circle"
                            color="#fff"
                        />
                    </View>
                </View>
            )
        });
    }, [navigation, selectedCategory]);

    const handleDeleteCategory = () => {
        Alert.alert(
            'Confirm Deletion',
            `Are you sure you want to delete the category "${selectedCategory?.name}"?`,
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await dispatch(
                                deleteCategoryAsync(categoryId)
                            ).unwrap();

                            await dispatch(fetchCategories());

                            Alert.alert(
                                'Success',
                                'Category deleted successfully.',
                                [
                                    {
                                        text: 'OK',
                                        onPress: () => navigation.goBack()
                                    }
                                ]
                            );
                        } catch (error) {
                            Alert.alert(
                                'Error',
                                'Failed to delete the category. Please try again later.'
                            );
                        }
                    }
                }
            ],
            { cancelable: true }
        );
    };

    return <HomeMealList displayMeals={displayMeals} />;
};

export default HomeMealOverview;
