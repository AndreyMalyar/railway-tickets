import Form from "../../components/forms/Form.tsx";
import "./styleHome.scss";


function HomePage(){
    return (
        <main>
            <section className="section section-home">
                <div className="container">
                    <h1 className="section-home__title">Let's Find That Ticket</h1>
                    <p className="section-home__subtitle">Before Someone Else Does</p>
                    <Form />
                </div>
            </section>
        </main>
    )
}

export default HomePage;