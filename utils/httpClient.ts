// httpClient.ts
import axios from 'axios';

const httpClient = axios.create({
    baseURL: 'https://649aaf0ebf7c145d02394cc8.mockapi.io', // Set your base URL
    timeout: 10000, // Timeout in milliseconds
    headers: {
        'Content-Type': 'application/json' // Common headers
    }
});

export default httpClient;
