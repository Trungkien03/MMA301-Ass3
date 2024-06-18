import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = 'favorites';

// Save favorites to AsyncStorage
export const saveFavorites = async (favorites: string[]): Promise<void> => {
    try {
        await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (e) {
        console.error('Failed to save favorites', e);
    }
};

// Load favorites from AsyncStorage
export const loadFavorites = async (): Promise<string[]> => {
    try {
        const favorites = await AsyncStorage.getItem(FAVORITES_KEY);
        return favorites ? JSON.parse(favorites) : [];
    } catch (e) {
        console.error('Failed to load favorites', e);
        return [];
    }
};

// Clear all favorites
export const clearFavorites = async (): Promise<void> => {
    try {
        await AsyncStorage.removeItem(FAVORITES_KEY);
    } catch (e) {
        console.error('Failed to clear favorites', e);
    }
};
