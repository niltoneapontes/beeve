const INITIAL_STATE: Beverage[] = []
// action types
export const ADD_BEVERAGES_REQUEST = 'beverages/request'
export const ADD_BEVERAGES_SUCCESS = 'beverages/success'
export const ADD_BEVERAGES_ERROR = 'beverages/error'

export const FETCH_BEVERAGES_REQUEST = 'beverages/fetch-request'
export const FETCH_BEVERAGES_SUCCESS = 'beverages/fetch-success'
export const FETCH_BEVERAGES_ERROR = 'beverages/fetch-error'

// reducer
export function beveragesReducer(state = INITIAL_STATE, action: {
    type: string;
    payload: any;
}): Beverage[] {
    switch(action.type) {
        case ADD_BEVERAGES_REQUEST:
            return state
        case ADD_BEVERAGES_SUCCESS:
            return [
                ...state,
                action.payload
            ]
        case ADD_BEVERAGES_ERROR:
            return state
        case FETCH_BEVERAGES_REQUEST:
            return state
        case FETCH_BEVERAGES_SUCCESS:
            return [
                ...action.payload
            ]
        case FETCH_BEVERAGES_ERROR:
            return state
        default: 
            return state;
    }
}

// action creators
export const addBeveragesRequest = (payload: Beverage) => ({
    type: ADD_BEVERAGES_REQUEST,
    payload,
    meta: {
        reducer: beveragesReducer
    }
})

export const addBeveragesSuccess = (payload: Beverage) => ({
    type: ADD_BEVERAGES_SUCCESS,
    payload,
    meta: {
        reducer: beveragesReducer
    }
})

export const addBeveragesError = () => ({
    type: ADD_BEVERAGES_ERROR,
    meta: {
        reducer: beveragesReducer
    }
})

export const fetchBeveragesRequest = (payload: { userId: number }) => ({
    type: FETCH_BEVERAGES_REQUEST,
    payload,
    meta: {
        reducer: beveragesReducer
    }
})

export const fetchBeveragesSuccess = (payload: Beverage[]) => ({
        type: FETCH_BEVERAGES_SUCCESS,
        payload,
        meta: {
            reducer: beveragesReducer
        }
    })

export const fetchBeveragesError = () => ({
    type: FETCH_BEVERAGES_ERROR,
    meta: {
        reducer: beveragesReducer
    }
})

