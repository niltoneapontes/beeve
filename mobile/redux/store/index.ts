import { legacy_createStore } from "redux";
import { favoritesReducer } from "../ducks/favorites";

export const store = legacy_createStore(favoritesReducer)

store.subscribe(() => console.log(store.getState()))