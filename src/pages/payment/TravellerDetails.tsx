import { useAppSelector } from "../../store/hooks.ts";

function TravellerDetails() {
    const { passengerName, passengerEmail, extraBaggage, selectedFood } = useAppSelector(state => state.booking);
    const { food } = useAppSelector(state => state.railway);

    // Находим название выбранной еды
    const selectedFoodData = selectedFood ? food.find(item => item.id === selectedFood) : null;

    return (
        <>
            <h3 className="traveller-details__title">Traveller Details</h3>
            <div className="traveller-details__info">
                <p className="traveller-details__name">{passengerName}</p>
                <p className="traveller-details__baggage">Extra Baggage: {extraBaggage ? <span>1</span> : <span>0</span>}</p>
                <p className="traveller-details__food">
                    {selectedFoodData ? selectedFoodData.title : "No food selected"}
                </p>
                <p className="traveller-details__email">
                    E-Tickets will be sent to: <span>{passengerEmail}</span>
                </p>
            </div>
        </>
    )
}

export default TravellerDetails;