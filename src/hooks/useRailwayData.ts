import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks.ts";
import { fetchAllData } from "../store/slices/railwaySlice.ts";

type DataType = 'cities' | 'food' | 'promo' | 'trainData';

export const useRailwayData = (requiredData: DataType[]) => {
    const dispatch = useAppDispatch();
    const data = useAppSelector(state => state.railway);

    const missingData = requiredData.some(dataType => data[dataType].length === 0);

    useEffect(() => {
        // Проверяем есть ли все нужные данные
        const missingData = requiredData.some(dataType => {
            return data[dataType].length === 0;
        })

        if(missingData && !data.isLoading){
            dispatch(fetchAllData())
        }
    }, [])

    return {
        loadingMessage: 'Инициализация данных... Это может занять до 30 секунд',
        hasRequiredData: !missingData //проверка загружены ли данные
    };
}