import { legacy_createStore } from "redux";
import { favoritesReducer } from "../ducks/favorites";
import createSagaMiddleware from "redux-saga";

const sagaMiddleware = createSagaMiddleware()

export const store = legacy_createStore(favoritesReducer)

store.subscribe(() => console.log(store.getState()))
