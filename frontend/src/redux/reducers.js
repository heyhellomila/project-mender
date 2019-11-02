import { combineReducers } from 'redux';

const rootReducer = (state = {
    user: null,
    loading: false,
    error: null,
}, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.user };
        case 'LOGOUT':
            return { ...state, user: null };
        case 'LOADING':
            return { ...state, loading: action.isLoading };
        case 'ERROR':
            return { ...state, error: action.error };
        default:
            return state;
    }
};

export default combineReducers({
    user: rootReducer
});