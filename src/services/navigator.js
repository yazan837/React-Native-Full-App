import {NavigationActions} from 'react-navigation';

let _container;

const setContainer = (container) => {
  _container = container;
};

const reset = (routeName, params) => {
  _container.dispatch(
    NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          type: 'Navigation/NAVIGATE',
          routeName,
          params,
        }),
      ],
    }),
  );
};

const navigate = async (routeName, params) => {
  await _container.dispatch(
    NavigationActions.navigate({
      type: 'Navigation/NAVIGATE',
      routeName,
      params,
    }),
  );
};

const replace = async (routeName, params) => {
  await _container.dispatch(
    NavigationActions.navigate({
      type: 'Navigation/REPLACE',
      routeName,
      params,
    }),
  );
};

const navigateDeep = (actions) => {
  _container.dispatch(
    actions.reduceRight(
      (prevAction, action) =>
        NavigationActions.navigate({
          type: 'Navigation/NAVIGATE',
          routeName: action.routeName,
          params: action.params,
          action: prevAction,
        }),
      undefined,
    ),
  );
};

const getCurrentRoute = () => {
  if (!_container || !_container.state.nav) {
    return null;
  }

  return _container.state.nav.routes[_container.state.nav.index] || null;
};

export default {
  setContainer,
  navigateDeep,
  navigate,
  reset,
  replace,
  getCurrentRoute,
};
