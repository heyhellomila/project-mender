import { NavigationActions } from 'react-navigation';

let _container;

function setContainer(container) {
    _container = container;
}

function navigate(routeName, params) {
    _container.dispatch(
        NavigationActions.navigate({
            type: 'Navigation/NAVIGATE',
            routeName,
            params,
        }),
    );
}

export default {
    setContainer,
    navigate
};