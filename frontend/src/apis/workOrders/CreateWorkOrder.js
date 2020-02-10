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
        if (error.code === 'ECONNABORTED' || error.response.data.statusCode === 500) {
            throw new Error('Internal server error. Please try again later.');
        } else if (error.response && error.response.data.statusCode > 400) {
            console.log(error.response);
            throw new Error('Could not create work order. Please try again later.');
        } else {
            throw error;
        }
});

export async function createWorkOrder(propertyId, sectorKind, workOrderType,
    title, cause, serviceNeeded, emergency, priorityType, location, notification, dueDate, priceEstimate) {

    let body = {
        sectorKind,
        workOrderType, 
        title, 
        cause, 
        serviceNeeded: JSON.stringify(serviceNeeded),
        emergency: JSON.stringify(emergency),
        priorityType, 
        location,
        notification,
        dueDate,
        priceEstimate
    };

    return await api.post(`/properties/${propertyId}/workorders/`, body, {
        headers: {'Authorization': await AsyncStorage.getItem('Authorization')}
    });
}	
