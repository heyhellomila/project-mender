import api from './index'
import { AsyncStorage } from 'react-native';

export const login = async (email, password) => {
    return await api.post('/users/login', {
        email: email,
        password: password
    });
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