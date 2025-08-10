import Form from "../../components/forms/Form.tsx";
import "./styleHome.scss";
import {useRailwayData} from "../../hooks/useRailwayData.ts";
import Loader from "../../components/Loader.tsx";


function HomePage(){
    const { loadingMessage, hasRequiredData } = useRailwayData(['cities'])
    return (
        <main>
            <section className="section section-home">
                <h1 className="section-home__title">Let's Find That Ticket</h1>
                <p className="section-home__subtitle">Before Someone Else Does</p>
                <div className="container container__content">
                    {hasRequiredData ? <Form/> : <Loader message={loadingMessage} height={"437px"} />}
                </div>
            </section>
        </main>
    )
}

export default HomePage;