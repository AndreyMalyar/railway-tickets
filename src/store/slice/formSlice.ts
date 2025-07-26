import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface FormState {
    tripType: 'roundTrip' | 'oneWay';
    departure: string;
    arrival: string;
    departureDate: string;
    returnDate: string;
    passenger: number;
}

const initialState: FormState = {
    tripType: 'roundTrip',
    departure: '',
    arrival: '',
    departureDate: '',
    returnDate: '',
    passenger: 1,

}

export const formSlice = createSlice({
    name: "Form",
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
        }
    }
})

export const { setTripType, setDeparture,  setArrival, setDepartureDate, setReturnDate, setPassenger } = formSlice.actions;
export default formSlice.reducer;