import axios from 'axios';
import { LOCAL_API_KEY } from 'react-native-dotenv';
import { AsyncStorage } from 'react-native';
import { handleGeneralErrors } from '../ErrorHandler';

var api = axios.create({
    baseURL: `http://${LOCAL_API_KEY}/api`,
    timeout: 5000
});

api.interceptors.response.use(async (response) => {
    return response;
}, async (error) => {
    await handleGeneralErrors(error);
    if (error.response && error.response.data.statusCode > 400) {
        throw new Error(error.response.data.statusCode);
    } else {
        throw error;
    }
});

export async function updateUser(id, updatedUser) {
    return await api.patch(`/users/${id}`, {
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        phoneNumber: updatedUser.phoneNumber,
        password: updatedUser.password,
        confirmPassword: updatedUser.currentPassword
    },{
        headers: {'Authorization': await AsyncStorage.getItem('Authorization')}});
}