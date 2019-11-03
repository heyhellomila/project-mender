import { AsyncStorage } from 'react-native';
import { getUser } from '../apis/UserApis';
import { getUserId } from '../utils/AuthUtil';

export const authenticate = (token) => async dispatch => {
    dispatch(loading(true));
    await AsyncStorage.setItem('Authorization', token).then(async (_) => {
        userId = await getUserId();
        if (!userId) {
            dispatch(error('Error'));
            dispatch(loading(false));
        }
        const {data} = await getUser(userId); 
        if (!data) {
            dispatch(error('Error'));
            dispatch(loading(false));
        }
        dispatch(login(data));
        dispatch(loading(false));
    }).catch((err) => {
        dispatch(error(err.message || 'ERROR'));
        dispatch(loading(false));
    });
}

export const userLogout = () => async dispatch => {
    dispatch(loading(true));
    AsyncStorage.removeItem('Authorization').then((_) => {
        dispatch(logout());
        dispatch(loading(false));
    }).catch((err) => {
            dispatch(error(err.message || 'ERROR'));
            dispatch(loading(false));
    })
}

export const login = user => ({
    type: 'LOGIN',
    user
});

export const logout = () => ({
    type: 'LOGOUT',
});

export const loading = bool => ({
    type: 'LOADING',
    isLoading: bool,
});

export const error = error => ({
    type: 'ERROR',
    error,
});