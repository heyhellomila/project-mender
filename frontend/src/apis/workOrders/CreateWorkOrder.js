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
            throw new Error('Could not create work order.');
        } else {
            throw error;
        }
});

export async function createWorkOrder(propertyId, sector, type, title, cause, serviceNeeded, priority, 
    description, dueDate, priceEstimate) {

    var body = {
        sector, 
        type, 
        title, 
        cause, 
        service_needed: JSON.stringify(serviceNeeded), 
        priority, 
        description, 
        due_date: dueDate,
        price_estimate: JSON.stringify(priceEstimate)
    };

    return await api.post(`/properties/${propertyId}/workorders/`, body, {
        headers: {'Authorization': await AsyncStorage.getItem('Authorization')}
    });
}	