import {
    NavigationProp,
    RouteProp,
    useNavigation
} from '@react-navigation/native';
import { useEffect } from 'react';

import { useSelector } from 'react-redux';
import HomeMealList from '../components/HomeComponents/HomeMealList';
import { RootState } from '../store/redux/Store';
import { RootStackParamList } from '../types/app.types';
import IconButton from '../components/UIComponents/IconButton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type HomeMealOverviewProps = {
    route: RouteProp<RootStackParamList, 'HomeMealOverview'>;
    navigation: NavigationProp<RootStackParamList, 'HomeMealOverview'>;
};

const HomeMealOverview: React.FC<HomeMealOverviewProps> = ({ route }) => {
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
                <IconButton
                    onTap={() =>
                        navigation.navigate('AddCategoryItem', {
                            categoryId: selectedCategory?.id ?? ''
                        })
                    }
                    iconName="add-circle"
                    color="#fff"
                />
            )
        });
    }, [navigation, selectedCategory]);

    return <HomeMealList displayMeals={displayMeals} />;
};

export default HomeMealOverview;
