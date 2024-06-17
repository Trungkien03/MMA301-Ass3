import { createDrawerNavigator } from '@react-navigation/drawer';
import { RootDrawerParamList, RootStackParamList } from '../../types/app.types';
import HomeScreen from '../../screens/HomeScreen';
import CategoriesScreen from '../../screens/CategoriesScreen';
import { MaterialIcons } from '@expo/vector-icons';
import FavoritesScreen from '../../screens/FavoritesScreen';
import IconButton from '../UIComponents/IconButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import HomeAddCategory from '../HomeComponents/HomeAddCategory';
import { View } from 'react-native';

const Drawer = createDrawerNavigator<RootDrawerParamList>();

const DrawerNavigator = () => {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <Drawer.Navigator
            initialRouteName="HomeScreen"
            screenOptions={{
                headerStyle: { backgroundColor: '#553737' },
                headerTintColor: 'white',
                sceneContainerStyle: { backgroundColor: '#434343' }
            }}
        >
            <Drawer.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={({}) => ({
                    title: 'Home',
                    drawerLabelStyle: {
                        color: '#553737'
                    },
                    drawerIcon: () => (
                        <IconButton iconName="home" color="#553737" />
                    ),
                    headerRight: () => (
                        <View style={{ paddingHorizontal: 10 }}>
                            <IconButton
                                onTap={() => navigation.navigate('AddCategory')}
                                iconName="add-circle"
                                color="#fff"
                            />
                        </View>
                    )
                })}
            />
            <Drawer.Screen
                name="MealsCategories"
                component={CategoriesScreen}
                options={{
                    title: 'Meals Categories',
                    drawerLabelStyle: {
                        color: '#553737'
                    },
                    drawerIcon: () => (
                        <MaterialIcons
                            name="category"
                            size={24}
                            color="#553737"
                        />
                    )
                }}
            />

            <Drawer.Screen
                name="MealFavorites"
                component={FavoritesScreen}
                options={{
                    title: 'Favorites',
                    drawerLabelStyle: {
                        color: '#553737'
                    },
                    drawerIcon: () => (
                        <MaterialIcons
                            name="favorite"
                            size={24}
                            color="#553737"
                        />
                    )
                }}
            />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;
