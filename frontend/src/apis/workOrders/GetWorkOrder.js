import { AsyncStorage } from 'react-native';
import axios from 'axios';	
import { LOCAL_API_KEY } from 'react-native-dotenv'	;

var api = axios.create({	
    baseURL: `http://${LOCAL_API_KEY}/api`,
    timeout: 5000
});	

api.interceptors.response.use(async (response) => {
    return await response;
    }, async (error) => {
        if (error.code === 'ECONNABORTED' || error.response.data.statusCode === 500){
            throw new Error('Internal server error. Please try again later.');
        } else if (error.response.data.statusCode > 400) {
            throw new Error('Could not find work order.');
        } else {
            throw error;
        }
});

export async function getWorkOrders(propertyId, pageSize, pageNumber) {
    return await api.get(`/workorders/?propertyId=${propertyId}&pageSize=${pageSize}&pageNumber=${pageNumber}`, {
        headers: {
            'Authorization': await AsyncStorage.getItem('Authorization')
        }
    });
}

export async function getWorkOrdersByPropertyId(propertyId) {	
    return await api.get(`/properties/${propertyId}/workorders/`, {	
        headers: {	
            'Authorization': await AsyncStorage.getItem('Authorization')	
        }	
    });
}

export async function getWorkOrderById(workOrderId) {	
    return await api.get(`/workorders/${workOrderId}`, {	
        headers: {	
            'Authorization': await AsyncStorage.getItem('Authorization')	
        }	
    });
}

