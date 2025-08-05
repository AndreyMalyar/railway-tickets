import "./stylePaymentPage.scss";
import PaymentMethod from "./PaymentMethod.tsx";
import BookingActionsLinks from "../../components/BookingActionsLinks.tsx";



function PaymentPage(){


    return (
        <section className="section">
            <div className="container container__content">
                <h2 className="section__title">Pay ₹1744 to confirm booking</h2>
                <PaymentMethod />
                <BookingActionsLinks />
            </div>
        </section>
    )
}

export default PaymentPage;