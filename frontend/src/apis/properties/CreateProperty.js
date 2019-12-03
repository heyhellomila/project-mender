import axios from 'axios';
import { LOCAL_API_KEY } from 'react-native-dotenv';
import { AsyncStorage } from 'react-native';

const api = axios.create({
    baseURL: `http://${LOCAL_API_KEY}/api`,
    timeout: 5000
});

api.interceptors.response.use(async (response) => {
    return await response;
}, async (error) => {
    if (error.code === 'ECONNABORTED' || error.response.data.statusCode === 500) {
        throw new Error('Internal server error. Please try again later.');
    } else if (error.response && error.response.data.statusCode > 400) {
        throw new Error('Could not create property.');
    } else {
        throw error;
    }
});

export async function createProperty(userId, propertyType, address, city, province,
                                     postalCode, countryCode, name) {

    const body = {
        propertyType,
        address,
        city,
        province,
        postalCode,
        countryCode,
        name
    };

    return await api.post(`/users/${userId}/properties/`, body, {
        headers: {'Authorization': await AsyncStorage.getItem('Authorization')}
    });
}
