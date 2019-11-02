import axios from 'axios';

const api = axios.create({
    baseURL: `http://192.168.2.86:3000/api`
});

api.interceptors.response.use(async (response) => {
    return await response;
}, async (error) => {
    throw error;
});

export default api;
