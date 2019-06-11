import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createLogger} from 'redux-logger';
import {reducer as formReducer} from 'redux-form';
import auth from './auth';
import purchase from './purchase';

const reducer = combineReducers({
    auth,
    purchase,
    form: formReducer
})

const middleware = composeWithDevTools(
    applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)

const store = createStore(reducer, middleware)

export default store
export * from './auth'
export * from './purchase'