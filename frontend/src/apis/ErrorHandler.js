import store from '../redux/store';
import {error, loading, logout} from '../redux/actions';
import {AsyncStorage} from 'react-native';
import NavigatorService from '../navigation/NavigatorService';

const isTokenExpired = (statusCode, errorName) => {
    return statusCode === 401 && errorName === 'TokenExpiredError';
};

// Log the user out and redirect to login page.
const handleExpiredToken = async() => {
    store.dispatch(loading(true));
    NavigatorService.navigate('LogInPage');

    setTimeout(() => {
        AsyncStorage.removeItem('Authorization').then((_) => {
            store.dispatch(logout());
        }).finally(() => {
            store.dispatch(loading(false));
        });
    }, 1500);
};

export const handleGeneralErrors = async(error) => {
    if (error.code === 'ECONNABORTED' || error.response.data.statusCode === 500) {
        throw new Error('Internal server error. Please try again later.');
    } else if (isTokenExpired(error.response.data.statusCode, error.response.data.errorMessage.name)) {
        await handleExpiredToken();
        throw new Error('Your session has expired.');
    }
};
