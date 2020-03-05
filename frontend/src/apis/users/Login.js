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
        if (error.response && error.response.data.statusCode > 400) {
            throw new Error('E-mail and password don\'t match.')
        } else {
            throw Error('Could not login. Please try again later.');
        }
});

export async function login(email, password) {
    return await api.post('/users/login', {	
        email: email,	
        password: password
    })
}	
