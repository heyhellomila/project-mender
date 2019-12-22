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
        case 'USER_PROFILE_UPDATED':
            return { ...state, user: action.user };
        default:
            return state;
    }
};

const propertyReducer = (state = {
    property: null,
    reloadProperties: false
}, action) => {
    switch (action.type) {
        case 'LOGOUT':
                return { ...state, property: null };
        case 'SELECT_PROPERTY':
            return { ...state, property: action.property };
        case 'RELOAD_PROPERTIES':
            return { ...state, reloadProperties: action.reloadProperties};
        default:
            return state;
    }
};

const app = combineReducers({
    user: rootReducer,
    property: propertyReducer
});

export default app;
