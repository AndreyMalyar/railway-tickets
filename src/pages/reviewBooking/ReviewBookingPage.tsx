import BoardingDetails from "./BoardingDetails.tsx";
import "./styleReview.scss";
import FoodCard from "./FoodCard.tsx";
import OffersSection from "./OffersSection.tsx";
import ApplyCode from "./ApplyCode.tsx";
import ExtraBaggage from "./ExtraBaggage.tsx";


function ReviewBookingPage(){
    return (
        <main>
            <section className="section">
                <div className="container container__content">
                    <h2 className="section__title ">Review your booking</h2>
                    <BoardingDetails/>
                    <FoodCard/>
                    <OffersSection/>
                    <div className="booking-extras">
                        <ApplyCode/>
                        <ExtraBaggage/>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default ReviewBookingPage