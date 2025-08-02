import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface BookingState {
    tripType: 'roundTrip' | 'oneWay';
    departure: string;
    arrival: string;
    departureDate: string;
    returnDate: string;
    passenger: number;
    selectedTrain: string | null;
    selectedClass: string | null;
    selectedFood: number | null;
}

const initialState: BookingState = {
    tripType: 'roundTrip',
    departure: '',
    arrival: '',
    departureDate: '',
    returnDate: '',
    passenger: 1,
    selectedTrain: null,
    selectedClass: null,
    selectedFood: null,
}

export const bookingSlice  = createSlice({
    name: "booking",
    initialState: initialState,
    reducers: {
        setTripType: (state, action: PayloadAction<'roundTrip' | 'oneWay'>) => {
            state.tripType = action.payload;
        },
        setDeparture: (state, action: PayloadAction<string>) => {
            state.departure = action.payload;
        },
        setArrival: (state, action: PayloadAction<string>) => {
            state.arrival = action.payload;
        },
        setDepartureDate: (state, action: PayloadAction<string>) => {
            state.departureDate = action.payload;
        },
        setReturnDate: (state, action: PayloadAction<string>) => {
            state.returnDate = action.payload;
        },
        setPassenger: (state, action: PayloadAction<number>) => {
            state.passenger = action.payload;
        },
        setSelectedTrain: (state, action: PayloadAction<string>) => {
            state.selectedTrain = action.payload;
        },
        setSelectedClass: (state, action: PayloadAction<string>) => {
            state.selectedClass = action.payload;
        },
        setSelectedFood: (state, action: PayloadAction<number | null>) => {
            state.selectedFood = action.payload;
        }
    }
})

export const {
    setTripType,
    setDeparture,
    setArrival,
    setDepartureDate,
    setReturnDate,
    setPassenger,
    setSelectedTrain,
    setSelectedClass,
    setSelectedFood
} = bookingSlice.actions;

export default bookingSlice.reducer;