import { put, takeEvery } from 'redux-saga/effects'
import { ADD_FAVORITE, ADD_FAVORITE_ASYNC } from '../ducks/favorites'

async function createUser() {
    await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('ok')
        }, 20000)
    })
}

function* saveFavorite(action: any) {
    try {
        yield createUser()
      yield put({ type: ADD_FAVORITE, payload: action.payload })
    } catch (e) {
        // do nothing
    }
  }

export function* mySaga() {
    yield takeEvery(ADD_FAVORITE_ASYNC, saveFavorite)
}