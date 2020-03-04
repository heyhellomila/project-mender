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
        throw new Error('Could not create work order. Please try again later.');
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
