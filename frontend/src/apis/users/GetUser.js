import { AsyncStorage } from 'react-native';
import axios from 'axios';	
import { LOCAL_API_KEY } from 'react-native-dotenv'
import { handleGeneralErrors } from '../ErrorHandler';

var api = axios.create({	
    baseURL: `http://${LOCAL_API_KEY}/api`,
    timeout: 5000
});	

api.interceptors.response.use(async (response) => {
    return response;
    }, async (error) => {
        await handleGeneralErrors(error);
        if (error.response.data.statusCode > 400) {
            throw new Error('Could not find user.')
        } else {
            throw Error('Could not get user. Please try again later.');
        }
});

export async function getUser(id) {	
    return await api.get(`/users/${id}`, {	
        headers: {	
            'Authorization': await AsyncStorage.getItem('Authorization')	
        }	
    })	
}
