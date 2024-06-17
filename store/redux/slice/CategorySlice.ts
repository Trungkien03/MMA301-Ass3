import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCategories } from '../api/CategoryApis';

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

const CategorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        addFavorite: (state, action: PayloadAction<{ id: string }>) => {
            state.favorites.push(action.payload.id);
        },
        removeFavorite: (state, action: PayloadAction<{ id: string }>) => {
            state.favorites = state.favorites.filter(
                (favId) => favId !== action.payload.id
            );
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
            .addMatcher(
                (action) => action.type.endsWith('/pending'),
                (state) => {
                    state.status = 'loading';
                }
            )
            .addMatcher(
                (action) => action.type.endsWith('/rejected'),
                (state, action) => {
                    state.status = 'failed';
                    state.error = action.error.message || null;
                }
            );
    }
});

export const { addFavorite, removeFavorite, addCategory, addItemCategory } =
    CategorySlice.actions;
export default CategorySlice.reducer;
