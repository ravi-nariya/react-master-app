import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface CounterState {
  value: number
}

const initialState: CounterState = {
  value: 0,
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
    incrementByXRequest: {
      reducer: () => {},
      prepare: (amount: number) => ({ payload: amount }),
    },
  },
})

export const { increment, decrement, incrementByAmount, incrementByXRequest } =
  counterSlice.actions
export default counterSlice.reducer
