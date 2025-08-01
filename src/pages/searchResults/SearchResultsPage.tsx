import Form from "../../components/forms/Form.tsx";
import AdBanner from "./AdBanner.tsx";
import "./styleSearchResults.scss"
import TrainCards from "./TrainCard.tsx";


function SearchResultsPage(){

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