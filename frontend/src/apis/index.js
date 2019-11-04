import axios from 'axios';
import { LOCAL_API_KEY } from 'react-native-dotenv'

var api = axios.create({
    baseURL: `http://${LOCAL_API_KEY}/api`
});

api.interceptors.response.use(async (response) => {
    return await response;
}, async (error) => {
    throw error;
});

export default api;
