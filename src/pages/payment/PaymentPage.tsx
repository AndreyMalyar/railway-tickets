import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./stylePaymentPage.scss";
import PaymentMethod from "./PaymentMethod.tsx";
import BookingActionsLinks from "../../components/BookingActionsLinks.tsx";
import { useAppSelector } from "../../store/hooks.ts";
import BoardingDetails from "../reviewBooking/BoardingDetails.tsx"
import TravellerDetails from "./TravellerDetails.tsx";


function PaymentPage(){
    const booking = useAppSelector(state => state.booking);
    const navigate = useNavigate();
    const { selectedTrain } = useAppSelector(state => state.booking);
    const { trainData } = useAppSelector(state => state.railway);

    // Находим выбранный поезд из нового store
    const selectedTrainData = trainData.find(train => train.id.toString() === selectedTrain);

    if (!selectedTrainData) {
        return <div className="review">Train not found</div>;
    }

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
        <section className="section">
            <div className="container container__content">

                <h2 className="section__title">Pay <span style={{color: "#FF6060"}}>{booking.totalPrice}</span> to confirm booking</h2>
                <div className="details-box">
                    <BoardingDetails />
                    <TravellerDetails />
                </div>
                <PaymentMethod/>
                <BookingActionsLinks/>
            </div>
        </section>
    )
}

export default PaymentPage;