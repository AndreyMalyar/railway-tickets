import GlobsButton from "../GlobsButton.tsx";
import TripTypeSelector from "./TripTypeSelector.tsx";
import { useAppSelector, useAppDispatch} from "../../store/hooks.ts";
import { setTripType } from "../../store/slices/formSlice.ts";
import { useNavigate } from "react-router-dom";
import { setDeparture, setArrival, setDepartureDate, setReturnDate } from "../../store/slices/formSlice.ts";
import './styleForm.scss';



function Form(){
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { tripType, departure, arrival, departureDate, returnDate, passenger } = useAppSelector(state => state.form);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // предотвращает перезагрузку
        navigate('/search-results');
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <TripTypeSelector
                className="form-tripType"
                passenger={passenger}
                value={tripType}
                onChange={(value) => dispatch(setTripType(value))}
            />
            <fieldset className="form__fieldset">
                <label htmlFor="departure">
                    Departure
                    <input
                        type="text"
                        name="departure"
                        id="departure"
                        placeholder="Your City/Station"
                        value={departure}
                        onChange={(evt) => dispatch(setDeparture(evt.target.value))}
                    />
                </label>
                <label htmlFor="arrival">
                    Arrival
                    <input
                        type="text"
                        name="arrival"
                        id="arrival"
                        placeholder="Where to?"
                        value={arrival}
                        onChange={(evt) => dispatch(setArrival(evt.target.value))}
                    />

                </label>
            </fieldset>
            <fieldset className="form__fieldset">
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
                className="form__button"
                label='Ticket, Please!'
                type="submit"
                onClick={() => navigate('/search-results')}
            />
        </form>
    )
}

export default Form