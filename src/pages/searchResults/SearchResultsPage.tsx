import Form from "../../components/forms/Form.tsx";
import AdBanner from "./AdBanner.tsx";
import "./styleSearchResults.scss"
import TrainCards from "./TrainCard.tsx";

import { useAppSelector } from "../../store/hooks";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useRailwayData} from "../../hooks/useRailwayData.ts";
import Loader from "../../components/Loader.tsx";


function SearchResultsPage(){
    const booking = useAppSelector(state => state.booking);
    const navigate = useNavigate();
    const { loadingMessage, hasRequiredData } = useRailwayData(['cities'])


    useEffect(() => {
        // Проверка наличия данных
        if (!booking.departure || !booking.arrival || !booking.departureDate) {
            // редиректить обратно
            navigate('/', { replace: true });
        }
    }, []);



    return (
        <main>
            <div className="container container__content">
                <section className="section section__search-results">
                    <h2 className="section__title">Search Results</h2>

                    {hasRequiredData ? <Form/> : <Loader message={loadingMessage} height={"100px"} />}
                    <AdBanner />
                    <TrainCards/>
                </section>
            </div>
        </main>
    )
}

export default SearchResultsPage;