import { createStore, applyMiddleware, compose } from 'redux';
import { AsyncStorage } from 'react-native';
import reducers from './reducers';

function configureStore(initialState = {}) {
  // Create the store with:
  // 1. sagaMiddleware: Makes redux-sagas work
  const middlewares = [];
  const enhancers = [
    applyMiddleware(...middlewares),
    global.reduxNativeDevTools
      ? global.reduxNativeDevTools({ maxAge: 100 })
      : noop => noop,
  ];
  const store = createStore(
    reducers,
    initialState,
    compose(...enhancers)
  );
  return store;
}

export default configureStore({});