import Form from "../../components/forms/Form.tsx";
import AdBanner from "./AdBanner.tsx";
import "./styleSearchResults.scss"
import TrainCards from "./TrainCard.tsx";


function SearchResultsPage(){

    return (
        <main>
            <section className="section section__search-results">
                <Form />
                <AdBanner />
                <TrainCards />
            </section>
        </main>
    )
}

export default SearchResultsPage;