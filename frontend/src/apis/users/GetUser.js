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
            throw new Error('Could not find user.')
        } else {
            throw error;
        }
});

export async function getUser(id) {	
    return await api({	
        method: 'get',	
        url: `/users/${id}`,	
        headers: {	
            'Authorization': await AsyncStorage.getItem('Authorization')	
        }	
    })	
}
