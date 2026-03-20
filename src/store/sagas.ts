import type { PayloadAction } from '@reduxjs/toolkit'
import { all, put, takeLatest } from 'redux-saga/effects'
import { incrementByAmount, incrementByXRequest } from './features/counterSlice'

function* incrementByXWorker(action: PayloadAction<number>) {
  yield put(incrementByAmount(action.payload))
}

function* watchIncrementByX() {
  yield takeLatest(incrementByXRequest.type, incrementByXWorker)
}

export default function* rootSaga() {
  yield all([watchIncrementByX()])
}
