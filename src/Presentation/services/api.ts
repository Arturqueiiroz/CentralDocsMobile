import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const IP_SERVIDOR = '10.0.2.2';
const PORTA = '5083';

export const API_BASE_URL = `http://${IP_SERVIDOR}:${PORTA}/api`;

console.log('🌐 API:', API_BASE_URL);

export const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
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

        console.log(
            '➡️ Requisição:',
            `${config.baseURL}${config.url}`
        );

        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log('❌ Erro da API:', error.message);

        if (error.response) {
            console.log('Status:', error.response.status);
            console.log('Dados:', error.response.data);
        }

        return Promise.reject(error);
    }
);