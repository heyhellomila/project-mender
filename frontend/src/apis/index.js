import axios from 'axios';
import { LOCAL_API_KEY } from 'react-native-dotenv'

var api = axios.create({
    baseURL: `http://${LOCAL_API_KEY}/api`
});

api.interceptors.request.use(() => {
    alert(JSON.stringify(LOCAL_API_KEY));
});

export default api;
