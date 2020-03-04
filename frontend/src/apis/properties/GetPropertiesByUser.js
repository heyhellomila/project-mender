import { AsyncStorage } from 'react-native';
import axios from 'axios';	
import { LOCAL_API_KEY } from 'react-native-dotenv';
import {ActivityStatus} from '../../constants/enums/ActivityStatus';
import { handleGeneralErrors } from '../ErrorHandler';

const api = axios.create({
    baseURL: `http://${LOCAL_API_KEY}/api`,
    timeout: 5000
});	

api.interceptors.response.use(async (response) => {
    return response;
}, async (error) => {
    await handleGeneralErrors(error);
    throw new Error('Could not get properties. Please try again later.');
});

export async function getPropertiesByUser(id) {
    return await api.get(`/users/${id}/properties`, {
        headers: {	
            'Authorization': await AsyncStorage.getItem('Authorization')	
        },
        params: { activityStatus : ActivityStatus.ACTIVE }
    });
}
