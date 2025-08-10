import { useAppSelector } from "../../store/hooks";
import createMockTrains from "../../data/trainData"
import foodData from "../../data/foodData";

function BillDetails(){
    const {
        departure,
        arrival,
        departureDate,
        returnDate,
        selectedTrain,
        selectedClass,
        selectedFood,
        passenger,
        tripType,
        extraBaggage,
        selectedPromoCode
    } = useAppSelector(state => state.booking)

    // Получить данные поездов
    const trains = createMockTrains(
        departure,
        arrival,
        departureDate,
        returnDate
    );
    // Найти выбранный поезд
    const selectedTrainData = trains.find(train => train.id.toString() === selectedTrain);
    // Найти выбранный класс в этом поезде
    const selectedClassData = selectedTrainData?.classes.find(cls => cls.type === selectedClass);
    // расчет стоимости билетов в одну или в обе стороны
    const baseTicketPrice = selectedClassData ? selectedClassData.price * passenger * (tripType === 'roundTrip' ? 2 : 1) : 0;

    const selectedFoodData = selectedFood ? foodData.find(food => food.id === selectedFood) : null;
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

    return (
        <div className="bill-details">
            <h3 className="bill-details__title">Bill details</h3>
            <div className="bill-details__items">
                <div className="bill-item">
                    <span className="bill-item__label">Base Ticket Fare</span>
                    <span className="bill-item__price">₹{baseTicketPrice}</span>
                </div>
                <div className="bill-item">
                    <span className="bill-item__label">{foodTitle}</span>
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