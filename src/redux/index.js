import { compose, combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import toggleMenuReducer from './menu/reducer';

const composeEnhancers =
  (process.env.NODE_ENV === 'development'
    ? window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']
    : null) || compose;

/**
 * reducer
 */
export const reducer = combineReducers({
  menu: toggleMenuReducer,
});

/**
 * store
 */
export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

/**
 * dispatcher
 */
export * from './menu/action';

/**
 * selector
 */
export * from './menu/selector';
