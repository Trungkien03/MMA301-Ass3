import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
    fetchCategories,
    addCategoryAsync,
    updateCategoryAsync
} from '../api/CategoryApis';
import { loadFavorites, saveFavorites } from '../../storage';

export interface Category {
    id: string;
    name: string;
    items: OrchidItem[];
}

export interface OrchidItem {
    id: string;
    name: string;
    weight: number;
    rating: string;
    price: number;
    isTopOfTheWeek: boolean;
    image: string;
    color: string;
    bonus: string;
    origin: string;
}

interface CategoriesState {
    allCategories: Category[];
    favorites: string[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: CategoriesState = {
    allCategories: [],
    favorites: [],
    status: 'idle',
    error: null
};

// Async thunk to load favorites from AsyncStorage
export const loadFavoritesAsync = createAsyncThunk<string[]>(
    'categories/loadFavorites',
    async () => {
        return await loadFavorites();
    }
);

const CategorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        addFavorite: (state, action: PayloadAction<{ id: string }>) => {
            if (!state.favorites.includes(action.payload.id)) {
                state.favorites.push(action.payload.id);
                saveFavorites(state.favorites);
            }
        },
        removeFavorite: (state, action: PayloadAction<{ id: string }>) => {
            state.favorites = state.favorites.filter(
                (favId) => favId !== action.payload.id
            );
            saveFavorites(state.favorites);
        },
        addCategory: (state, action: PayloadAction<Category>) => {
            state.allCategories.push(action.payload);
        },
        addItemCategory: (
            state,
            action: PayloadAction<{ item: OrchidItem; categoryId: string }>
        ) => {
            const { item, categoryId } = action.payload;
            const category = state.allCategories.find(
                (cat) => cat.id === categoryId
            );
            if (category) {
                category.items.push(item);
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.allCategories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            })
            .addCase(addCategoryAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addCategoryAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.allCategories.push(action.payload);
            })
            .addCase(addCategoryAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            })
            .addCase(updateCategoryAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateCategoryAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.allCategories.findIndex(
                    (category) => category.id === action.payload.id
                );
                if (index !== -1) {
                    state.allCategories[index] = action.payload;
                }
            })
            .addCase(updateCategoryAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            })
            .addCase(loadFavoritesAsync.fulfilled, (state, action) => {
                state.favorites = action.payload;
            });
    }
});

export const { addFavorite, removeFavorite, addCategory, addItemCategory } =
    CategorySlice.actions;
export default CategorySlice.reducer;
