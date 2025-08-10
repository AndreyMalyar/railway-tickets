import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { transformTrainData } from "../../utilits/trainUtilits.ts";


type RawTrain = {
    id: number;
    number: string;
    name: string;
    runsOn: string;
    departureTime: string;
    durationHours: number;
    classes: TrainClass[];
}

type TrainClass = {
    type: string;
    status: "Avl" | "WL";
    available: string;
    price: number;
}

type TrainStation = {
    time: string;
    station: string;
    date: string;
}

export type Train = {
    id: number;
    number: string;
    name: string;
    runsOn: string;
    departure: TrainStation;
    arrival: TrainStation;
    duration: string;
    classes: TrainClass[];
}

interface TrainsState {
    data: Train[];
    status: 'initialize' | 'loading' | 'success' | 'failure';
    error: string | null;
    isLoadingDetail: boolean;
}

const initialState: TrainsState = {
    data: [],
    status: 'initialize',
    error: null,
    isLoadingDetail: false,
}

// Async thunk с трансформацией данных
export const fetchTrains = createAsyncThunk(
    'trains/fetchTrains',
    async ({ departure, arrival, departureDate }: { departure: string; arrival: string; departureDate: string }) => {
        await new Promise(resolve => setTimeout(resolve, 500));

        const response = await fetch('/railway-tickets/data/trains.json');
        if (!response.ok) throw new Error('Failed to fetch trains');

        const rawTrains: RawTrain[] = await response.json();

        // Используем утилиту для трансформации
        return transformTrainData(rawTrains, departure, arrival, departureDate);
    }
);

const trainsSlice = createSlice({
    name: "trains",
    initialState,
    reducers: {
        setLoadingDetail: (state, action: PayloadAction<boolean>) => {
            state.isLoadingDetail = action.payload;
        },
        clearTrains: (state) => {
            state.data = [];
            state.error = null;
            state.status = 'initialize';
            state.isLoadingDetail = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTrains.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchTrains.fulfilled, (state, action) => {
                state.status = 'success';
                state.data = action.payload; // ← уже трансформированные данные
                state.error = null;
            })
            .addCase(fetchTrains.rejected, (state, action) => {
                state.status = 'failure';
                state.error = action.error.message || 'Failed to fetch trains';
            })
    }
})

export const { setLoadingDetail, clearTrains } = trainsSlice.actions;
export default trainsSlice.reducer;