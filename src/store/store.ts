import { configureStore } from "@reduxjs/toolkit";
import bookingSlice from "./slices/bookingSlice";
import uiSlice from "./slices/uiSlice";
import railwaySlice from "./slices/railwaySlice.ts";


export const store = configureStore({
    reducer: {
        booking: bookingSlice,
        ui: uiSlice,
        railway: railwaySlice,
    }
})

export type RootState = ReturnType<typeof store.getState>;// официальное соглашение
export type AppDispatch = typeof store.dispatch;