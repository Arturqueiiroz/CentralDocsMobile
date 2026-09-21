import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const IP_SERVIDOR = '10.0.2.2';
const PORTA = '5000';

export const API_BASE_URL = `http://${IP_SERVIDOR}:${PORTA}/api`;

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);