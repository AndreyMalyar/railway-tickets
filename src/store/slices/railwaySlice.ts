import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


interface ICity {
    id: number;
    name: string;
    code: string;
}

interface IFood {
    id: number;
    image: string;
    title: string;
    price: number;
}

interface IPromo {
    id: number | string;
    image: string;
    title: string;
}

interface ITrainClass {
    type: string;
    status: string;
    available: string;
    price: number;
}

interface ITrainSchedule {
    time: string;
    station: string;
    date: string;
}

interface ITrain {
    id: number;
    number: string;
    name: string;
    runsOn: string;
    departure: ITrainSchedule ;
    arrival: ITrainSchedule ;
    duration: string;
    classes: ITrainClass[]
}

interface IDataError {
    endpoint: string;
    error: string;
}

interface IRailwayState {
    cities: ICity[];
    food: IFood[];
    promo: IPromo[];
    trainData: ITrain[];
    isLoading: boolean;
    errors: IDataError[]
}

const initialState: IRailwayState = {
    cities: [],
    food: [],
    promo: [],
    trainData: [],
    isLoading: false,
    errors: []
}

export const fetchAllData = createAsyncThunk(
    'railway/fetchAllData',
    async (_, { rejectWithValue }) => {
        try {
            const results = await Promise.allSettled([
                fetch('https://railway-tickets-api.onrender.com/city').then(res =>
                    res.ok ? res.json() : Promise.reject('Города недоступны')
                ),
                fetch('https://railway-tickets-api.onrender.com/food').then(res =>
                    res.ok ? res.json() : Promise.reject('Еда недоступна')
                ),
                fetch('https://railway-tickets-api.onrender.com/promo').then(res =>
                    res.ok ? res.json() : Promise.reject('Реклама недоступна')
                ),
                fetch('https://railway-tickets-api.onrender.com/trainData').then(res =>
                    res.ok ? res.json() : Promise.reject('Билеты недоступны')
                ),
            ]);

           return {
                cities: results[0].status === 'fulfilled' ? results[0].value : [],
                food: results[1].status === 'fulfilled' ? results[1].value : [],
                promo: results[2].status === 'fulfilled' ? results[2].value : [],
                trainData: results[3].status === 'fulfilled' ? results[3].value : [],

                errors: results.map((result, index) =>
                    result.status === 'rejected' ?
                        { endpoint: ['cities', 'food', 'promo', 'trainData' ][index], error: String(result.reason) } : null
                ).filter((error): error is IDataError => error !== null)
            };

        } catch (error) {
            return rejectWithValue('Критическая ошибка загрузки данных');
        }
    }
);

export const railwaySlice = createSlice({
    name: "railway",
    initialState,
    reducers: {
        clearErrors: (state) => {
            state.errors = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllData.pending, (state) => {
                state.isLoading = true;
                state.errors = [];
            })
            .addCase(fetchAllData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cities = action.payload.cities;
                state.food = action.payload.food;
                state.promo = action.payload.promo;
                state.trainData = action.payload.trainData;
                state.errors = action.payload.errors // ошибки частичной загрузки
            })
            .addCase(fetchAllData.rejected, (state, action) => {
                state.isLoading = false;
                // При полном провале - оставляем старые данные, добавляем общую ошибку
                state.errors = [{ endpoint: 'all', error: action.payload as string }];
            })
    }
})

export const { clearErrors } = railwaySlice.actions;
export default railwaySlice.reducer;