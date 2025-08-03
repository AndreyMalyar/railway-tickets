import GlobsButton from "../../components/GlobsButton.tsx";


function BookingActions(){
    return (
        <div className="booking-actions">
            <p className="booking-actions__description">Discounts, offers and price concessions will be applied later during payment</p>
            <GlobsButton className="booking-actions__btn" label="Book Now" />
            <GlobsButton className="booking-actions__btn booking-actions__btn-cancel" label="Cancel" />
            <div className="booking-actions__links">
                <a href="#" className="booking-actions__link">Cancellation Policy</a>
                <a href="#" className="booking-actions__link">Terms & Conditions</a>
                <a href="#" className="booking-actions__link">Travel Insurance</a>
            </div>
        </div>
    )
}

export default BookingActions;