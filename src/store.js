import { applyMiddleware, createStore, combineReducers } from 'redux';
import { sessionService } from 'redux-react-session'
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import Reducers from "./redux/reducerController"

const middleware = applyMiddleware(promise, thunk,logger);

const store = createStore(combineReducers(Reducers), middleware);

sessionService.initSessionService(store, { driver: 'COOKIES' })

export default store;