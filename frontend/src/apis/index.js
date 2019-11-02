import axios from 'axios';
import { LOCAL_API_KEY } from 'react-native-dotenv'

const api = axios.create({
<<<<<<< HEAD
    baseURL: `http://192.168.2.234:3000/api`
=======
    baseURL: `http://${LOCAL_API_KEY}/api`
>>>>>>> 622295af499fed68de0ee4cb30bfa43403801bd7
});

api.interceptors.response.use(async (response) => {
    return await response;
}, async (error) => {
    throw error;
});

export default api;
