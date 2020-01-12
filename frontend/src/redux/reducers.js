import { combineReducers } from 'redux';

const rootReducer = (state = {
    user: null,
    loading: false,
    error: null,
    reloadingUserProfile: false
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
        case 'RELOAD_PROFILE':
            return { ...state, reloadingUserProfile: action.reloadingUserProfile, user: action.user };
        default:
            return state;
    }
};

const propertyReducer = (state = {
    property: null,
    reloadProperties: false,
    loadingProperties: false,
    selectLast: false,
    maintainSelection: false,
}, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, loadingProperties: true };
        case 'LOGOUT':
                return { ...state, property: null };
        case 'SELECT_PROPERTY':
            return { ...state, property: action.property };
        case 'LOAD_PROPERTIES':
            return { ...state, loadingProperties: action.loadProperties};
        case 'RELOAD_PROPERTIES':
            return { ...state, reloadProperties: action.reloadProperties, selectLast: action.selectLast,
                maintainSelection: action.maintainSelection };
        default:
            return state;
    }
};

const app = combineReducers({
    user: rootReducer,
    property: propertyReducer
});

export default app;
