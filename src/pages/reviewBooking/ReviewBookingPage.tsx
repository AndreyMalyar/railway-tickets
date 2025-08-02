import BoardingDetails from "./BoardingDetails.tsx";
import "./styleReview.scss";
import FoodCard from "./FoodCard.tsx";


function ReviewBookingPage(){
    return (
        <main>
            <section className="section">
                <div className="container container__content">
                    <h2 className="section__title ">Review your booking</h2>
                    <BoardingDetails/>
                    <FoodCard />
                </div>
            </section>
        </main>
    )
}

export default ReviewBookingPage