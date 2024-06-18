// store.js or wherever you configure your store
import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './slice/FavoritesSlice';
import categoryReducer from './slice/CategorySlice';

export const store = configureStore({
    reducer: {
        favoriteMeals: favoritesReducer,
        categories: categoryReducer
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
