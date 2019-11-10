import { combineReducers } from 'redux';

const rootReducer = (state = {
    user: null,
    property: null,
    loading: false,
    error: null,
}, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.user };
        case 'LOGOUT':
            return { ...state, user: null };
        case 'SELECT_PROPERTY':
            return { ...state, property: action.property };
        case 'LOADING':
            return { ...state, loading: action.isLoading };
        case 'ERROR':
            return { ...state, error: action.error };
        default:
            return state;
    }
};

export default combineReducers({
    user: rootReducer,
    property: rootReducer
});
