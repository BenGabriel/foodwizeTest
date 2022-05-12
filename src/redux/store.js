import {combineReducers, applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import loginReducer from './reducers/loginReducers';
import animalReducer from './reducers/reducer';

const rootReducer = combineReducers({loginReducer, animalReducer});

export const Store = createStore(rootReducer, applyMiddleware(thunk));
