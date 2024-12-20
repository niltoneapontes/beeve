import { applyMiddleware, legacy_createStore } from "redux";
import { favoritesReducer } from "../ducks/favorites";
import createSagaMiddleware from "redux-saga";
import { mySaga } from "../sagas/favorites";

const sagaMiddleware = createSagaMiddleware()

export const store = legacy_createStore(favoritesReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(mySaga)
store.subscribe(() => console.log(store.getState()))



