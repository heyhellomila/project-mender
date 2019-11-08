import { AsyncStorage } from 'react-native';
import { LOCAL_API_KEY } from 'react-native-dotenv'

const baseURL = `http://${LOCAL_API_KEY}/api/`

export async function login(email, password) {
    return await fetch(baseURL + 'users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,
        })   
    }).then((response) => response.json()).then((responseJson) => {
        return responseJson;
    }).catch((error) => {
        return error;
    });
}

export async function getUser(id) {
    return await fetch(baseURL + `users/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': await AsyncStorage.getItem('Authorization')
        }  
    }).then((response) => response.json()).then((responseJson) => {
        return responseJson;
    }).catch((error) => {
        return error;
    });
}