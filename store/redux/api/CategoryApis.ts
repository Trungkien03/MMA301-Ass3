import { createAsyncThunk } from '@reduxjs/toolkit';
import httpClient from '../../../utils/httpClient'; // Import your HTTP client

// Define your API endpoints
const CATEGORIES_API = '/api/v1/categories';

// Define the payload types for your API requests
interface Category {
    id: string;
    name: string;
    items: OrchidItem[];
}

interface OrchidItem {
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

interface AddCategoryPayload {
    name: string;
    items: [];
}

interface AddItemPayload {
    categoryId: string;
    item: {
        name: string;
        weight: number;
        rating: string;
        price: number;
        isTopOfTheWeek: boolean;
        image: string;
        color: string;
        bonus: string;
        origin: string;
    };
}

// Define your async thunk actions for API requests
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

export const addItemAsync = createAsyncThunk<Category, AddItemPayload>(
    'categories/addItem',
    async (payload) => {
        const response = await httpClient.post<Category>(
            `${CATEGORIES_API}/${payload.categoryId}/items`,
            payload.item
        );
        return response.data;
    }
);

// Export any additional types or functions as needed
