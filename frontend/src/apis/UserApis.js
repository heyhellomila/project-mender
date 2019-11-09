import { AsyncStorage } from 'react-native';
import api from './index'

export async function login(email, password) {	
    return await api.post('/users/login', {	
        email: email,	
        password: password}	
    );	
}	

export async function getUser(id) {	
    return await api({	
        method: 'get',	
        url: `/users/${id}`,	
        headers: {	
            'Authorization': await AsyncStorage.getItem('Authorization')	
        }	
    })	
}
