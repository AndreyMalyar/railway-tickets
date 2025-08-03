import GlobsButton from "../GlobsButton.tsx";
import TripTypeSelector from "./TripTypeSelector.tsx";
import { useAppSelector, useAppDispatch} from "../../store/hooks.ts";
import { setTripType } from "../../store/slices/bookingSlice.ts";
import { useNavigate } from "react-router-dom";
import { setDeparture, setArrival, setDepartureDate, setReturnDate } from "../../store/slices/bookingSlice.ts";
import './styleForm.scss';
import DateRangePicker from "./DateRangePicker.tsx";
import { useEffect } from "react";


function Form(){
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { tripType, departure, arrival, departureDate, returnDate, passenger } = useAppSelector(state => state.booking);

    useEffect(() => {
        dispatch(setDepartureDate(''));
        dispatch(setReturnDate(''));
    }, [tripType, dispatch]); // срабатывает при изменении tripType


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
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

                <DateRangePicker
                    departValue={departureDate}
                    returnValue={returnDate}
                    returnDisabled={tripType === 'oneWay'}
                    onDepartChange={(date) => dispatch(setDepartureDate(date))}
                    onReturnChange={(date) => dispatch(setReturnDate(date))}
                />


            </fieldset>
            <GlobsButton
                className="form__button"
                label='Ticket, Please!'
                type="submit"
            />
        </form>
    )
}

export default Form