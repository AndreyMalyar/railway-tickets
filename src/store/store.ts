import { configureStore } from "@reduxjs/toolkit";
import bookingSlice from "./slices/bookingSlice.ts";
import uiSlice from "./slices/uiSlice.ts";


export const store = configureStore({
    reducer: {
        booking: bookingSlice,
        ui: uiSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>;// официальное соглашение
export type AppDispatch = typeof store.dispatch;