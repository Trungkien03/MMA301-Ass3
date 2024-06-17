import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { OrchidItem } from '../store/redux/slice/CategorySlice';

export type RootStackParamList = {
    QuickMeals: undefined;
    MealsOverview: { categoryId: string };
    MealDetail: { mealId: string };
    HomeMealOverview: { categoryId: string };
    HomeMealDetail: { meal: OrchidItem };
    AddCategory: undefined;
    AddCategoryItem: { categoryId: string };
};

export type RootDrawerParamList = {
    MealsCategories: undefined;
    HomeScreen: undefined;
    MealFavorites: undefined;
};

export type CategoriesScreenNavigationProps =
    NativeStackNavigationProp<RootStackParamList>;
