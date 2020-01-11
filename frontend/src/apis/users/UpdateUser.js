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
        throw new Error(error.response.data.statusCode)
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