import Form from "../../components/forms/Form.tsx";
import AdBanner from "./AdBanner.tsx";
import "./styleSearchResults.scss"
import TrainCards from "./TrainCard.tsx";

import { useAppSelector } from "../../store/hooks";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";


function SearchResultsPage(){
    const booking = useAppSelector(state => state.booking);
    const navigate = useNavigate();


    useEffect(() => {
        // Проверка наличия данных
        if (!booking.departure || !booking.arrival || !booking.departureDate) {
            // Можно редиректить обратно
            navigate('/', { replace: true });
        }
    }, []);



    return (
        <main>
            <div className="container container__content">
                <section className="section section__search-results">
                    <h2 className="section__title">Search Results</h2>
                    <Form/>
                    <AdBanner/>
                    <TrainCards/>
                </section>
            </div>
        </main>
    )
}

export default SearchResultsPage;