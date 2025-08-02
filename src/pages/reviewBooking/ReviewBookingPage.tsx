import BoardingDetails from "./BoardingDetails.tsx";
import "./styleReview.scss";


function ReviewBookingPage(){
    return (
        <main>
            <section className="section">
                <div className="container container__content">
                    <h2 className="section__title ">Review your booking</h2>
                    <BoardingDetails/>
                </div>
            </section>
        </main>
    )
}

export default ReviewBookingPage