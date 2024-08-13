import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    counter: 0
}

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        inc: (state, action) => {
            state.counter += action.payload;
        },
        dec: (state, action) => {
            state.counter -= action.payload;
        }
    }
})

export default counterSlice.reducer
export const { inc, dec } = counterSlice.actions