const INITIAL_STATE: Beverage[] = []

// action types
export const ADD_FAVORITE = 'favorites/add'
export const REMOVE_FAVORITE = 'favorites/remove'
export const CLEAN_FAVORITES = 'favorites/clean'

// reducer
export function favoritesReducer(state = INITIAL_STATE, action: {
    type: string;
    payload: any;
}): Beverage[] {
    switch(action.type) {
        case ADD_FAVORITE:
            return [
                ...state,
                action.payload
            ]
        case REMOVE_FAVORITE:
            return state.filter(beverage => beverage.id !== action.payload.id)
        case CLEAN_FAVORITES:
            return []  
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

export const cleanFavorites = () => ({
    type: CLEAN_FAVORITES,
    meta: {
        reducer: favoritesReducer
    }
})

