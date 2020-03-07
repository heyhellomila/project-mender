import { AsyncStorage } from 'react-native';
import axios from 'axios';
import { LOCAL_API_KEY } from 'react-native-dotenv';
import {handleGeneralErrors} from "../ErrorHandler";

const api = axios.create({
    baseURL: `http://${LOCAL_API_KEY}/api`,
    timeout: 5000
});

api.interceptors.response.use(async (response) => {
    return response;
}, async (error) => {
    await handleGeneralErrors(error);
    throw new Error('Could not update work order. Please try again later.');
});

export async function updateWorkOrderById(id, workOrder) {
    return await api.patch(`/workOrders/${id}`, workOrder, {
        headers: {
            'Authorization': await AsyncStorage.getItem('Authorization')
        }
    });
}