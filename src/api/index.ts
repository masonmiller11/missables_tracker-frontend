import axios from 'axios';

import { endpoints } from './endpoints';

export const client = axios.create({
    baseURL: 'http://localhost:8000/',
});

export async function apiLogin(email: string, password: string) {
        const response = await client.post(endpoints.authentication, {
            "username": email,
            "password": password
        });

        return response;

}