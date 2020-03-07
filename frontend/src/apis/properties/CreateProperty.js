import axios from 'axios';
import { LOCAL_API_KEY } from 'react-native-dotenv';
import { AsyncStorage } from 'react-native';
import { handleGeneralErrors } from '../ErrorHandler';

const api = axios.create({
    baseURL: `http://${LOCAL_API_KEY}/api`,
    timeout: 5000
});

api.interceptors.response.use(async (response) => {
    return response;
}, async (error) => {
    await handleGeneralErrors(error);
    throw Error('Error creating property. Please try again later.');
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
