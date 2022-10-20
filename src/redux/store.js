import {createStore} from 'redux';
import reducer from './reducer/reducers';
import {applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [], 
  whitelist: [],
};

const persist_reducer = persistReducer(persistConfig, reducer);

const store = createStore(persist_reducer, applyMiddleware(thunk));
const persistor = persistStore(store);

export {store, persistor};