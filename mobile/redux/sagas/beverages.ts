import { takeEvery, call, put, takeLatest } from 'redux-saga/effects'
import { ADD_BEVERAGES_REQUEST, addBeveragesError, addBeveragesSuccess, FETCH_BEVERAGES_REQUEST, fetchBeveragesError, fetchBeveragesSuccess } from '../ducks/beverages'
import { api, handleRequestError } from '@/api'

function* addBeverage(action: any) {
    try {
        if(action.payload.id) {
            // @ts-ignore
            const response = yield call(api.put, '/beverages', {
                id: action.payload.id,
                createdAt: action.payload.createdAt,
                description: action.payload.description,
                name: action.payload.name,
                rating: action.payload.rating,
                type: action.payload.type,
                userId: action.payload.userId,
                image: action.payload.image
              })
              if(response?.data.error) {
                yield put(addBeveragesError())
              } else {
                yield put(addBeveragesSuccess(response?.data))
              }
        } else {
            // @ts-ignore
            const response = yield call(api.post, '/beverages', {
                createdAt: action.payload?.createdAt,
                description: action.payload?.description,
                name: action.payload?.name,
                rating: action.payload?.rating,
                type: action.payload?.type,
                userId: action.payload?.userId,
                image: action.payload?.image
              })
              if(response?.data?.error) {
                yield put(addBeveragesError())
                handleRequestError(response?.data.error)
              } else {
                yield put(addBeveragesSuccess(response?.data))
              }
        }
    } catch(error) {
        handleRequestError(error)
        yield put(addBeveragesError())
    }
}

function* fetchBeverages(action: any) {
    try {
        //@ts-ignore
        const response = yield call(api.get, '/beverages', {
            params: {
              userId: action.payload?.userId || 0
            }
          })

          if(response?.data?.error) {
            handleRequestError(response?.data.error)
            yield put(fetchBeveragesError())
          } else {
            yield put(fetchBeveragesSuccess(response?.data))
          }
    } catch(error) {
        handleRequestError(error)
        yield put(fetchBeveragesError())
    }
}

export function* beveragesSaga() {
    yield takeEvery(ADD_BEVERAGES_REQUEST, addBeverage)
    yield takeLatest(FETCH_BEVERAGES_REQUEST, fetchBeverages)
}