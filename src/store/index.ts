import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist'
import createWebStorage from 'redux-persist/es/storage/createWebStorage'
import rootReducer from './rootReducer'
import rootSaga from './sagas'
const storage = createWebStorage('local')

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['counter'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch
export type AppState = ReturnType<typeof store.getState>
