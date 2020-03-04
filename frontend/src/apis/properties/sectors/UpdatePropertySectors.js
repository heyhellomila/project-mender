import { AsyncStorage } from 'react-native';
import axios from 'axios';
import { LOCAL_API_KEY } from 'react-native-dotenv';
import { handleGeneralErrors } from '../../ErrorHandler';

const api = axios.create({
    baseURL: `http://${LOCAL_API_KEY}/api`,
    timeout: 5000
});

api.interceptors.response.use(async (response) => {
    return response;
}, async (error) => {
    await handleGeneralErrors(error);
    throw error;
});

export async function updatePropertySectorsByPropertyId(id, propertySectors) {
    return await api.patch(`properties/${id}/sectors`, propertySectors,{
        headers: {
            'Authorization': await AsyncStorage.getItem('Authorization')
        },
    });
}
