import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UiState {
    theme: 'light' | 'dark';
    isAuthModalOpen: boolean;
    // другие UI состояния
}

const initialUi: UiState = {
    theme: 'dark',
    isAuthModalOpen: false,
}

export const uiSlice = createSlice({
    name: "ui",
    initialState: initialUi,
    reducers: {
        setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
            state.theme = action.payload;
        },
        toggleTheme: (state) => {
            state.theme = state.theme === 'dark' ? 'light' : 'dark';
        },
        openAuthModal: (state) => {
            state.isAuthModalOpen = true;
        },
        closeAuthModal: (state) => {
            state.isAuthModalOpen = false;
        }
    }
})

export const {setTheme, toggleTheme, openAuthModal, closeAuthModal} = uiSlice.actions;
export default uiSlice.reducer;