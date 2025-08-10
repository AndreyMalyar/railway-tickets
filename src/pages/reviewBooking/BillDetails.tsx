import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { setTotalPrice } from "../../store/slices/bookingSlice";
import { useRailwayData } from "../../hooks/useRailwayData";
import Loader from "../../components/Loader";
import { useEffect } from "react";


function BillDetails(){
    const dispatch = useAppDispatch();
    const {
        selectedTrain,
        selectedClass,
        selectedFood,
        passenger,
        tripType,
        extraBaggage,
        selectedPromoCode
    } = useAppSelector(state => state.booking)

    // Получаем данные из store
    const { trainData, food } = useAppSelector(state => state.railway);
    const { loadingMessage: trainLoading, hasRequiredData: hasTrains } = useRailwayData(['trainData']);
    const { loadingMessage: foodLoading, hasRequiredData: hasFood } = useRailwayData(['food']);

    // Если данных нет - показываем лоадер
    if (!hasTrains || !hasFood) {
        return <Loader message={hasTrains ? foodLoading : trainLoading} height="200px" />;
    }


    // Найти выбранный поезд
    const selectedTrainData = trainData.find(train => train.id.toString() === selectedTrain);
    const selectedClassData = selectedTrainData?.classes.find(cls => cls.type === selectedClass);
    // Найти выбранную еду из нового store
    const selectedFoodData = selectedFood ? food.find(item => item.id === selectedFood) : null;

    // расчет стоимости билетов в одну или в обе стороны
    const baseTicketPrice = selectedClassData ? selectedClassData.price * passenger * (tripType === 'roundTrip' ? 2 : 1) : 0;

    const foodPrice = selectedFoodData ? selectedFoodData.price : 0;
    const foodTitle = selectedFoodData ? selectedFoodData.title : '';

    const baggagePrice = extraBaggage ? 500 : 0;

    //налоги (CGST & SGST) со всей суммы
    const subtotal = baseTicketPrice + foodPrice + baggagePrice;
    // Налоги 18% от подсуммы
    const taxAmount = Math.round(subtotal * 0.18);

    const PROMO_DISCOUNTS: Record<string, number> = {
        BOOKNOW: 50,
        FIRSTTIME: 20,
    }
    const discountPercent = selectedPromoCode ? PROMO_DISCOUNTS[selectedPromoCode] || 0 : 0;
    const discountAmount = Math.round((subtotal + taxAmount) * discountPercent / 100);

    const totalCharge = subtotal + taxAmount - discountAmount;

    useEffect(() => {
        dispatch(setTotalPrice(totalCharge));
    }, [totalCharge, dispatch]);

    return (
        <div className="bill-details">
            <h3 className="bill-details__title">Bill details</h3>
            <div className="bill-details__items">
                <div className="bill-item">
                    <span className="bill-item__label">Base Ticket Fare</span>
                    <span className="bill-item__price">₹{baseTicketPrice}</span>
                </div>
                <div className="bill-item">
                    <span className="bill-item__label">{foodTitle || 'No food selected'}</span>
                    <span className="bill-item__price">₹{foodPrice}</span>
                </div>
                <div className="bill-item">
                    <span className="bill-item__label">Extra Baggage</span>
                    <span className="bill-item__price">₹{baggagePrice}</span>
                </div>
                <div className="bill-item">
                    <span className="bill-item__label">CGST & SGST</span>
                    <span className="bill-item__price">₹{taxAmount}</span>
                </div>
                <div className="bill-item">
                    <span className="bill-item__label">Discount</span>
                    <span className="bill-item__price">-₹{discountAmount}</span>
                </div>
            </div>
            <div className="bill-details__total">
                <span className="bill-details__total-label">Total Charge</span>
                <span className="bill-details__total-price">₹{totalCharge}</span>
            </div>
        </div>
    )
}

export default BillDetails;