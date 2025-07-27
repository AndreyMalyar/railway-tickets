import { configureStore } from "@reduxjs/toolkit";
import formSlice from "./slices/formSlice.ts";
import uiSlice from "./slices/uiSlice.ts";


export const store = configureStore({
    reducer: {
        form: formSlice,
        ui: uiSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>;// официальное соглашение
export type AppDispatch = typeof store.dispatch;