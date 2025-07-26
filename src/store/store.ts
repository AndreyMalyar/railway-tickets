import { configureStore } from "@reduxjs/toolkit";
import formSlice from "./slice/formSlice.ts";


export const store = configureStore({
    reducer: {
        form: formSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;// официальное соглашение
export type AppDispatch = typeof store.dispatch;