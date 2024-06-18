import { createAsyncThunk } from '@reduxjs/toolkit';
import httpClient from '../../../utils/httpClient'; // Import your HTTP client

// Define your API endpoints
const CATEGORIES_API = '/api/v1/categories';

// Define the payload types for your API requests
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

export interface AddCategoryPayload {
    name: string;
    items: OrchidItem[];
}

export interface UpdateCategoryPayload {
    id: string;
    name: string; // Ensure name is always sent in update
    items: OrchidItem[];
}

// Async Thunks
export const fetchCategories = createAsyncThunk<Category[]>(
    'categories/fetchCategories',
    async () => {
        const response = await httpClient.get<Category[]>(CATEGORIES_API);
        return response.data;
    }
);

export const addCategoryAsync = createAsyncThunk<Category, AddCategoryPayload>(
    'categories/addCategory',
    async (payload) => {
        const response = await httpClient.post<Category>(
            CATEGORIES_API,
            payload
        );
        return response.data;
    }
);

export const updateCategoryAsync = createAsyncThunk<
    Category,
    UpdateCategoryPayload
>('categories/updateCategory', async (payload) => {
    const response = await httpClient.put<Category>(
        `${CATEGORIES_API}/${payload.id}`,
        payload
    );
    return response.data;
});

export const deleteCategoryAsync = createAsyncThunk<{ id: string }, string>(
    'categories/deleteCategory',
    async (categoryId) => {
        await httpClient.delete(`${CATEGORIES_API}/${categoryId}`);
        return { id: categoryId };
    }
);
