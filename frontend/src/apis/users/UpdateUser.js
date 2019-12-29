import axios from 'axios';
import { LOCAL_API_KEY } from 'react-native-dotenv';
import { AsyncStorage } from 'react-native';

var api = axios.create({
    baseURL: `http://${LOCAL_API_KEY}/api`,
    timeout: 5000
});

api.interceptors.response.use(async (response) => {
    return await response;
}, async (error) => {
    if (error.code == 'ECONNABORTED' || error.response.data.statusCode == '500') {
        throw new Error('Internal server error. Please try again later.')
    } else if (error.response && error.response.data.statusCode > 400) {
        throw new Error('Invalid information')
    } else {
        throw error;
    }
});

export async function updateUser(id, firstName, lastName, email, phoneNumber) {
    return await api.patch(`/users/${id}`, {
        firstName,
        lastName,
        email,
        phoneNumber
    },{
        headers: {'Authorization': await AsyncStorage.getItem('Authorization')}});
}

export async function updateUserPassword(id, password) {
    return await api.patch(`/users/${id}`, {
        password
    },{
        headers: {'Authorization': await AsyncStorage.getItem('Authorization')}});
}