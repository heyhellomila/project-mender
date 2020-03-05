import axios from 'axios';
import { LOCAL_API_KEY } from 'react-native-dotenv';
import { handleGeneralErrors } from '../ErrorHandler';

var api = axios.create({
    baseURL: `http://${LOCAL_API_KEY}/api`,
    timeout: 5000
});

api.interceptors.response.use(async (response) => {
    return response;
}, async (error) => {
    await handleGeneralErrors(error);
    if (error.response.data.statusCode === 409) {
        throw new Error('Email is already in use.');
    } else if (error.response.data.statusCode > 400) {
        throw new Error('Could not create user. Please try again later.');
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
