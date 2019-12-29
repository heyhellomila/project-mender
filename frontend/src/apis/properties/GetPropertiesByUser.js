import { AsyncStorage } from 'react-native';
import axios from 'axios';	
import { LOCAL_API_KEY } from 'react-native-dotenv';
import {ActivityStatus} from "../../constants/enums/ActivityStatus";

const api = axios.create({
    baseURL: `http://${LOCAL_API_KEY}/api`,
    timeout: 5000
});	

api.interceptors.response.use(async (response) => {
    return await response;
    }, async (error) => {
        if (error.code === 'ECONNABORTED' || error.response.data.statusCode === 500) {
            throw new Error('Internal server error. Please try again later.');
        } else {
            throw error;
        }
});

export async function getPropertiesByUser(id) {
    return await api.get(`/users/${id}/properties`, {
        headers: {	
            'Authorization': await AsyncStorage.getItem('Authorization')	
        },
        params: { activityStatus : ActivityStatus.ACTIVE }
    });
}
