import { AsyncStorage } from 'react-native';
import { getUser } from '../apis/users/GetUser';
import { getUserId } from '../utils/AuthUtil';

export const authenticate = (token) => async dispatch => {
    dispatch(loading(true));
    await AsyncStorage.setItem('Authorization', token).then(async (_) => {
        const userId = await getUserId();
        if (!userId) {
            dispatch(error('Error'));
            dispatch(loading(false));
        }
        await getUser(userId).then((response) => {
            if (!response.data) {
                dispatch(error('Error'));
                dispatch(loading(false));
            }
            dispatch(login(response.data));
            dispatch(loading(false));
        })
    }).catch((err) => {
        dispatch(error(err.message || 'ERROR'));
        dispatch(loading(false));
    });
};

export const userLogout = () => async dispatch => {
    dispatch(loading(true));
    AsyncStorage.removeItem('Authorization').then((_) => {
        setTimeout(() => {
            dispatch(logout());
        }, 1500);
        dispatch(loading(false));
    }).catch((err) => {
            dispatch(error(err.message || 'ERROR'));
            dispatch(loading(false));
    })
};

export const selectProperty = (property) => (dispatch) => {
    dispatch(propertySelection(property));
};

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

export const reloadUserProfile = (bool, user) => ({
    type: 'RELOAD_PROFILE',
    reloadingUserProfile: bool,
    user
});

export const propertySelection = (property) => ({
    type: 'SELECT_PROPERTY',
    property
});

export const reloadProperties = (bool, options = {}) => ({
    type: 'RELOAD_PROPERTIES',
    reloadProperties: bool,
    selectLast: options.selectLast,
    maintainSelection: options.maintainSelection
});

export const loadProperties = bool => ({
    type: 'LOAD_PROPERTIES',
    loadingProperties: bool
});

export const reloadWorkOrders = (bool) => ({
    type: 'RELOAD_WORK_ORDERS',
    reloadWorkOrders: bool
});
