import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://67a149eb5bc0f54adc9d3b00.mockapi.io/api/v1', // Replace with your actual MockAPI URL if different
});
