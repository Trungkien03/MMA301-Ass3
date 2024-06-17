import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeMealDetailScreen from '../../screens/HomeMealDetailScreen';
import HomeMealOverview from '../../screens/HomeMealOverview';
import MealDetailScreen from '../../screens/MealDetailScreen';
import MealsOverviewScreen from '../../screens/MealsOverviewScreen';
import { RootStackParamList } from '../../types/app.types';
import DrawerNavigator from './DrawerNavigator';
import HomeAddCategory from '../HomeComponents/HomeAddCategory';
import HomeAddCategoryItem from '../HomeComponents/HomeAddCategoryItem';

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="QuickMeals" // Updated name to be unique
            screenOptions={{
                headerBackTitle: 'Back',
                headerStyle: { backgroundColor: '#553737' },
                headerTintColor: 'white',
                contentStyle: { backgroundColor: '#434343' }
            }}
        >
            <Stack.Screen
                name="QuickMeals" // Updated name to be unique
                component={DrawerNavigator}
                options={{
                    title: 'Quick Meals',
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="MealsOverview"
                component={MealsOverviewScreen}
            />
            <Stack.Screen
                name="HomeMealOverview"
                component={HomeMealOverview}
            />
            <Stack.Screen name="MealDetail" component={MealDetailScreen} />
            <Stack.Screen
                name="HomeMealDetail"
                component={HomeMealDetailScreen}
            />
            <Stack.Screen
                name="AddCategory"
                component={HomeAddCategory}
                options={{ presentation: 'modal' }}
            />
            <Stack.Screen
                name="AddCategoryItem"
                component={HomeAddCategoryItem}
                options={{ presentation: 'modal' }}
            />
        </Stack.Navigator>
    );
};

export default StackNavigator;
