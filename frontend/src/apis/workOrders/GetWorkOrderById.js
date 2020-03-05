import { AsyncStorage } from 'react-native';
import axios from 'axios';	
import { LOCAL_API_KEY } from 'react-native-dotenv'	;
import { handleGeneralErrors } from '../ErrorHandler';

var api = axios.create({	
    baseURL: `http://${LOCAL_API_KEY}/api`,
    timeout: 5000
});	

api.interceptors.response.use(async (response) => {
    return response;
    }, async (error) => {
        await handleGeneralErrors(error);
        throw new Error('Could not find work order.');
});

export async function getWorkOrderById(workOrderId) {	
    return await api.get(`/workorders/${workOrderId}`, {	
        headers: {	
            'Authorization': await AsyncStorage.getItem('Authorization')	
        }	
    });
}