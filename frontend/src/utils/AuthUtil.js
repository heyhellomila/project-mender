import jwtDecode from 'jwt-decode';
import { AsyncStorage } from 'react-native';

export const getDecodedToken = async () => {
    try {
        const token = await AsyncStorage.getItem('Authorization');
        return jwtDecode(token);
    } catch (err) {
        return null;
    }
};

export const getUserId = async() => {
    try {
        const decodedToken = await getDecodedToken();
        return decodedToken.userId;
    } catch(err) {
        return null;
    }
};
