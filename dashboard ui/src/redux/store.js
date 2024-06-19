import { createStore, applyMiddleware } from 'redux';
import userReducer from './reducers/userReducer';
import productReducer from './reducers/productReducer';
import {thunk } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineReducers } from 'redux';
import storage from "redux-persist/lib/storage";
import {persistReducer, persistStore} from 'redux-persist';

const persistConfig = {
  key: "root",
  storage
}

const rootReducer = combineReducers({
  UserReducer: userReducer,
  ProductReducer: productReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer );

const composeEnhancers = composeWithDevTools({});
const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)));

export const presistor = persistStore(store);
export default store;