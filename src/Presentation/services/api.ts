import axios from 'axios';

const IP_SERVIDOR = '10.0.2.2';
const PORTA = '5083';

export const API_BASE_URL = `http://${IP_SERVIDOR}:${PORTA}/api/Usuario`;

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});