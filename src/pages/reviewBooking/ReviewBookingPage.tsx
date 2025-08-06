import BoardingDetails from "./BoardingDetails.tsx";
import "./styleReview.scss";
import FoodCard from "./FoodCard.tsx";
import OffersSection from "./OffersSection.tsx";
import ApplyCode from "./ApplyCode.tsx";
import ExtraBaggage from "./ExtraBaggage.tsx";
import BillDetails from "./BillDetails.tsx";
import BookingActions from "./BookingActions.tsx";
import PassengerForm from "./PassengerForm.tsx";

import { useAppSelector } from "../../store/hooks.ts";
import { useNavigate} from "react-router-dom";
import { useEffect } from "react";


function ReviewBookingPage(){
    const booking = useAppSelector(state => state.booking);
    const navigate = useNavigate();

    useEffect(() => {
        // Если нет базовых данных поиска - на главную
        if (!booking.departure || !booking.arrival || !booking.departureDate) {
            navigate('/', { replace: true });
            return;
        }

        // Если нет выбранного поезда/класса - на search-results
        if (!booking.selectedTrain || !booking.selectedClass) {
            navigate('/search-results', { replace: true });
        }
    }, []);

    return (
        <main>
            <section className="section">
                <div className="container container__content">
                    <h2 className="section__title ">Review your booking</h2>

                    {/* Отладочный блок */}
                    <pre>{JSON.stringify(booking, null, 2)}</pre>

                    <BoardingDetails/>
                    <PassengerForm />
                    <FoodCard/>
                    <OffersSection/>
                    <div className="booking-extras">
                        <ApplyCode/>
                        <ExtraBaggage/>
                    </div>
                    <BillDetails />
                    <BookingActions />
                </div>
            </section>
        </main>
    )
}

export default ReviewBookingPage