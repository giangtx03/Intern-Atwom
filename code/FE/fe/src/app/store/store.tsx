import { configureStore } from '@reduxjs/toolkit';

import counterReducer from '../reduces/counterSilce'
import SpinnerSlide from '../reduces/SpinnerSlice';

const store = configureStore({
    reducer: {
        counter: counterReducer,
        spinner: SpinnerSlide
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({ serializableCheck: false });
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;