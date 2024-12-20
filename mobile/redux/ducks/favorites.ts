export interface FavoritesState {
    beverages: Beverage[]
}

const INITIAL_STATE: FavoritesState = {
    beverages: [] as Beverage[]
}

// action types
export const ADD_FAVORITE = 'favorites/add'
export const ADD_FAVORITE_ASYNC = 'favorites/add_async'
export const REMOVE_FAVORITE = 'favorites/remove'

// reducer
export function favoritesReducer(state = INITIAL_STATE, action: {
    type: string;
    payload: any;
}) {
    switch(action.type) {
        case ADD_FAVORITE:
            console.log(action.payload)
            return {
                ...state,
                beverages: [...state.beverages, action.payload]
            }
        case REMOVE_FAVORITE:
            return {
                ...state,
                beverages: state.beverages.filter(beverage => beverage.id !== action.payload.id)
            }
        default: 
            return state;
    }
}

// action creators
export const addFavorite = (payload: Beverage) => ({
    type: ADD_FAVORITE,
    payload,
    meta: {
        reducer: favoritesReducer
    }
})

export const removeFavorite = (payload: { id: number }) => ({
    type: REMOVE_FAVORITE,
    payload,
    meta: {
        reducer: favoritesReducer
    }
})

export const addFavoriteAsync = (payload: Beverage) => ({
    type: ADD_FAVORITE_ASYNC,
    payload,
    meta: {
        reducer: favoritesReducer
    }
})
