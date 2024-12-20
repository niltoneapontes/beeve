import { combineReducers } from "redux";
import { favoritesReducer } from "../ducks/favorites";
import { beveragesReducer } from "../ducks/beverages";

export const rootReducer = combineReducers({
    favorites: favoritesReducer,  
    beverages: beveragesReducer
  });