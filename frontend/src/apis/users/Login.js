import axios from 'axios';	
import { LOCAL_API_KEY } from 'react-native-dotenv'	

var api = axios.create({	
    baseURL: `http://${LOCAL_API_KEY}/api`,
    timeout: 5000
});	

api.interceptors.response.use(async (response) => {
    return await response;
    }, async (error) => {
        if (error.code == 'ECONNABORTED' || error.response.data.statusCode == '500'){
            throw new Error('Internal server error. Please try again later.')
        } else if (error.response && error.response.data.statusCode > 400) {
            throw new Error('Invalid username or password.')
        } else {
            throw error;
        }
});

export async function login(email, password) {
    return await api.post('/users/login', {	
        email: email,	
        password: password
    })
}	
