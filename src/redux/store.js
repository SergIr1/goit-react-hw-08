import { configureStore } from '@reduxjs/toolkit';
import contactsSliceReducer from './contacts/slice';
import filtersSliceReducer from './filters/slice';
import authReducer from './auth/slice';
import modalReducer from './modal/slice';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistedAuthReducer = persistReducer(
  {
    key: 'user-token',
    storage,
    whitelist: ['token'],
  },
  authReducer
);

export const store = configureStore({
  reducer: {
    contacts: contactsSliceReducer,
    filters: filtersSliceReducer,
    auth: persistedAuthReducer,
    modal: modalReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
