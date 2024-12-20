import { applyMiddleware, legacy_createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { beveragesSaga } from "../sagas/beverages";
import { rootReducer } from "./rootReducer";

const sagaMiddleware = createSagaMiddleware()

export type RootState = ReturnType<typeof rootReducer>;

export const store = legacy_createStore(rootReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(beveragesSaga)

store.subscribe(() => console.log(store.getState()))
