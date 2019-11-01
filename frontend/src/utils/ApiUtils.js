import axios from 'axios';
import { AsyncStorage } from 'react-native';

const api = axios.create({
    baseURL: `http://192.168.2.86:3000/api`
});

api.interceptors.response.use(async (response) => {
    return await response;
}, async (error) => {
    throw error;
});

export const login = async (email, password) => {
    return await api.post('/users/login', {
        email: email,
        password: password}
    );
}

export const logout = async () => {
    return await api({
        method: 'post',
        url: '/users/logout',
        headers: {
            'Authorization': `Bearer ${await AsyncStorage.getItem('Authorization')}` 
        }, 
    });
}

export const getUser = async (id) => {
    return await api({
        method: 'get',
        url: `/users/${id}`,
        headers: {
            'Authorization': `Bearer ${await AsyncStorage.getItem('Authorization')}`
        }
    })
}