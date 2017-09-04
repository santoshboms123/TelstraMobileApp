import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';

import { AppNavigator } from '../navigators/AppNavigator';

// Start with two routes: The Main screen, with the Login screen on top.
// const firstAction = AppNavigator.router.getActionForPathAndParams('Main');
// const tempNavState = AppNavigator.router.getStateForAction(firstAction);
// const secondAction = AppNavigator.router.getActionForPathAndParams('Login');
// const initialNavState = AppNavigator.router.getStateForAction(
//   secondAction,
//   tempNavState
// );

//import { router } from '../../routes';
//console.log(AppNavigator);
const { getActionForPathAndParams, getStateForAction } = AppNavigator.router;
const initialState = getStateForAction(
  getActionForPathAndParams('Outage') 
);

export const name = 'navigation';

export function reducer(state = initialState, action) {
  return getStateForAction(action, state) || state;
}

function nav(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case 'Login':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.back(),
        state
      );
      break;
    case 'Logout':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Login' }),
        state
      );
      break;
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}

const initialAuthState = { isLoggedIn: false };

function auth(state = initialAuthState, action) {
  switch (action.type) {
    case 'Login':
      return { ...state, isLoggedIn: true };
    case 'Logout':
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
}
function ContactInfo(state = { ContactInfo: null }, action) {
  debugger;
  switch (action.type) {
    case 'ContactInfo': {
      const { ContactInfo } = action;
      return { ...state, ContactInfo };
    }
  }
  return state;
}
const AppReducer = combineReducers({
  nav: reducer,
  auth,
  ContactInfo
});

export default AppReducer;
