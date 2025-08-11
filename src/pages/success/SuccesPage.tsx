import { logoColorIcon } from "./Icons"
import "./styleSuccess.scss"
import { useAppSelector } from "../../store/hooks.ts";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import RouteDetails from "../../components/RouteDetails.tsx";
import BookingActionsLinks from "../../components/BookingActionsLinks.tsx";




function SuccessPage() {
    const booking = useAppSelector(state => state.booking);
    const navigate = useNavigate();
    const { selectedTrain, selectedFood } = useAppSelector(state => state.booking);
    const { trainData, food } = useAppSelector(state => state.railway);

    // Находим выбранный поезд из store
    const selectedTrainData = trainData.find(train => train.id.toString() === selectedTrain);
    // Находим название выбранной еды
    const selectedFoodData = selectedFood ? food.find(item => item.id === selectedFood) : null;

    useEffect(() => {
        // Проверяем все обязательные данные
        if (!booking.departure || !booking.arrival || !booking.departureDate) {
            navigate('/', { replace: true });
            return;
        }

        if (!booking.selectedTrain || !booking.selectedClass) {
            navigate('/search-results', { replace: true });
            return;
        }

        if (!booking.passengerName || !booking.passengerEmail) {
            navigate('/review-booking', { replace: true });
        }
    }, []);

    return (
        <section className="section success">
            <div className="container container__content">
                {logoColorIcon}
                <h2 className="success__title">Congratulations! <br /> You have successfully booked tickets</h2>

                <div className="success-details__box">
                    <div className="success-details__numbers">
                        <span className="success-details__pnr">PNR No: 1234567890</span>
                        <span className="success-details__transaction">Transaction ID : 351511859256378</span>
                    </div>
                    <p className="success-details__info">{selectedTrainData?.number} - {selectedTrainData?.name}</p>
                    <RouteDetails/>
                    <h3 className="success-details__title">Traveller Details</h3>
                    <p className="success-details__passenger">{booking.passengerName}</p>
                    <div className="success-details__boking-info">
                        <p>Booking Status : Confirmed (CNF)</p>
                        <p>Seat/Coach no. : Class {booking.selectedClass} & Tatkal Quota</p>
                        <p>Extra Baggage: {booking.extraBaggage ? <span>1</span> : <span>0</span>}</p>
                        <p>{selectedFoodData ? selectedFoodData.title : "No food selected"}</p>
                    </div>
                    <div className="success-details__email">
                        <span>E-Tickets will be sent to:</span>
                        <span>{booking.passengerEmail}</span>
                    </div>
                    <div className="success-details__total">
                        <span>Total Fare</span>
                        <span>₹{booking.totalPrice}</span>
                    </div>
                </div>

                <BookingActionsLinks/>
            </div>

        </section>
    )
}

export default SuccessPage;