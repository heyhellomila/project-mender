import jwtDecode from 'jwt-decode';
import { AsyncStorage } from 'react-native';

export const getDecodedToken = async () => {
    try {
        const token = await AsyncStorage.getItem('Authorization');
        return jwtDecode(token);
    } catch (err) {
        return null;
    }
}

export const isAuthenticated = () => {
    try {
        const token = getDecodedToken();
        if (token) {
            return true;
        }
        return false;
    } catch(err) {
        return false;
    }
};

export const getUserId = async() => {
    try {
        decodedToken = await getDecodedToken();
        return decodedToken._id;
    } catch(err) {
        return null;
    }
}
