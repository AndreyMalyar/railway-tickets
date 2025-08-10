import { useNavigate } from "react-router-dom";
import GlobsButton from "../../components/GlobsButton.tsx";
import BookingActionsLinks from "../../components/BookingActionsLinks.tsx";
import { useAppSelector } from "../../store/hooks.ts";
import { useState } from "react";


function BookingActions(){
    const navigate = useNavigate();
    const { passengerName, passengerEmail } = useAppSelector(state => state.booking);
    const [error, setError] = useState('');

    const handleBookNow = () => {
        // Проверяем заполнены ли данные пассажира
        if (!passengerName || !passengerEmail) {
            setError('Please fill in passenger details'); // или другое уведомление
            return;
        }
            setError(''); // очищаем ошибку если все ок
            navigate('/payment');
    }

    const handleCancel = () => {
        navigate('/search-results');
    }
    return (
        <div className="booking-actions">
            <p className="booking-actions__description">Discounts, offers and price concessions will be applied later during payment</p>

            {error && (
                <div className="booking-actions__error" style={{color: 'red'}}>{error}
                    {error}
                </div>
            )}

            <GlobsButton
                className="booking-actions__btn"
                label="Book Now"
                onClick={handleBookNow}
            />
            <GlobsButton
                className="booking-actions__btn booking-actions__btn-cancel"
                label="Cancel"
                onClick={handleCancel}
            />
            <BookingActionsLinks />
        </div>
    )
}

export default BookingActions;