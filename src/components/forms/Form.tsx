import GlobsButton from "../GlobsButton.tsx";
import TripTypeSelector from "./TripTypeSelector.tsx";
import { useAppSelector, useAppDispatch} from "../../store/hooks.ts";
import { setTripType } from "../../store/slice/formSlice.ts";
import { useNavigate } from "react-router-dom";
import { setDeparture, setArrival, setDepartureDate, setReturnDate } from "../../store/slice/formSlice.ts";



function Form(){
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { tripType, departure, arrival, departureDate, returnDate } = useAppSelector(state => state.form);

    console.log('Form data:', { tripType, departure, arrival, departureDate, returnDate });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // предотвращает перезагрузку
        navigate('/search-results');
    };

    return (
        <form className="section-home__form" onSubmit={handleSubmit}>
            <TripTypeSelector
                value={tripType}
                onChange={(value) => dispatch(setTripType(value))}
            />
            <fieldset>
                <label htmlFor="departure">Departure</label>
                <input
                    type="text"
                    name="departure"
                    id="departure"
                    placeholder="Your City/Station"
                    value={departure}
                    onChange={(evt) => dispatch(setDeparture(evt.target.value))}
                />
                <label htmlFor="arrival">Arrival</label>
                <input
                    type="text"
                    name="arrival"
                    id="arrival"
                    placeholder="Where to?"
                    value={arrival}
                    onChange={(evt) => dispatch(setArrival(evt.target.value))}
                />
            </fieldset>
            <fieldset>
                <legend>Pick your lucky day</legend>
                <label htmlFor="depart">Depart</label>
                <input
                    type="date"
                    name="depart"
                    id="depart"
                    value={departureDate}
                    onChange={(evt) => dispatch(setDepartureDate(evt.target.value))}
                />


                {tripType === 'roundTrip' && (
                    <>
                        <label htmlFor="return">Return</label>
                        <input
                            type="date"
                            name="return"
                            id="return"
                            value={returnDate}
                            onChange={(evt) => dispatch(setReturnDate(evt.target.value))}
                        />
                    </>
                )}
            </fieldset>
            <GlobsButton
                label='Ticket, Please'
                type="submit"
                onClick={() => navigate('/search-results')}
            />
        </form>
    )
}

export default Form