import GlobsButton from "../../components/GlobsButton.tsx";
import BookingActionsLinks from "../../components/BookingActionsLinks.tsx";


function BookingActions(){
    return (
        <div className="booking-actions">
            <p className="booking-actions__description">Discounts, offers and price concessions will be applied later during payment</p>
            <GlobsButton className="booking-actions__btn" label="Book Now" />
            <GlobsButton className="booking-actions__btn booking-actions__btn-cancel" label="Cancel" />
            <BookingActionsLinks />
        </div>
    )
}

export default BookingActions;