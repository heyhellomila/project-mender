import { AsyncStorage } from 'react-native';
import axios from 'axios';	
import { LOCAL_API_KEY } from 'react-native-dotenv'	

var api = axios.create({	
    baseURL: `http://${LOCAL_API_KEY}/api`,
    timeout: 5000
});	

api.interceptors.response.use(async (response) => {
    return await response;
    }, async (error) => {
        if (error.code == 'ECONNABORTED' || error.response.data.statusCode == 500){
            throw new Error('Internal server error. Please try again later.')
        } else if (error.response.data.statusCode > 400) {
            throw new Error('Could not find work order.')
        } else {
            throw error;
        }
});

export async function getWorkOrderById(id) {	
    return await api.get(`/workOrders/${id}/`, {	
        headers: {	
            'Authorization': await AsyncStorage.getItem('Authorization')	
        }	
    })	
}

export async function getWorkOrdersByPropertyId(property_id) {	
    return await api.get(`/properties/${property_id}/workorders/`, {	
        headers: {	
            'Authorization': await AsyncStorage.getItem('Authorization')	
        }	
    })	
}
