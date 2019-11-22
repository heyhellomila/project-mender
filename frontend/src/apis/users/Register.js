import axios from 'axios';
import { LOCAL_API_KEY } from 'react-native-dotenv';

var api = axios.create({
    baseURL: `http://${LOCAL_API_KEY}/api`,
    timeout: 5000
});

api.interceptors.response.use(async (response) => {
    return await response;
}, async (error) => {
    if (error.code === 'ECONNABORTED' || error.response.data.statusCode === 500) {
        throw new Error('Internal server error. Please try again later.');
    } else if (error.response.data.statusCode === 409) {
        throw new Error('Email is already in use.');
    } else if (error.response.data.statusCode > 400) {
        console.log(error.response.data.statusCode);
        throw new Error('Could not add user.');
    } else {
        throw error;
    }
});

export async function register(email, password, firstName, lastName, userType, phoneNumber) {
    return await api.post('/users/', {
        email,
        password,
        firstName,
        lastName,
        userType,
        phoneNumber
    });
}
