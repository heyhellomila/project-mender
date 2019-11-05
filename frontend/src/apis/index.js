import axios from 'axios';
import { LOCAL_API_KEY } from 'react-native-dotenv'
import { AsyncStorage } from 'react-native';

const api = axios.create({
    baseURL: `http://${LOCAL_API_KEY}/api`
});

export const login = async (email, password) => {
    return await api.post('/users/login', {
        email: email,
        password: password}
    );
}

export const getUser = async (id) => {
    return await api({
        method: 'get',
        url: `/users/${id}`,
        headers: {
            'Authorization': await AsyncStorage.getItem('Authorization')
        }
    })
}

export default api;
