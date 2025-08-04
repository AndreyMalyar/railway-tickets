import GlobsButton from "../GlobsButton.tsx";
import TripTypeSelector from "./TripTypeSelector.tsx";
import { useAppSelector, useAppDispatch} from "../../store/hooks.ts";
import { setTripType } from "../../store/slices/bookingSlice.ts";
import { useNavigate } from "react-router-dom";
import { setDeparture, setArrival, setDepartureDate, setReturnDate } from "../../store/slices/bookingSlice.ts";
import './styleForm.scss';
import DateRangePicker from "./DateRangePicker.tsx";
import CityAutocomplete from "./CityAutocomplete.tsx";
import { useEffect, useState } from "react";


function Form(){
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { tripType, departure, arrival, departureDate, returnDate, passenger } = useAppSelector(state => state.booking);

    const [localDeparture, setLocalDeparture] = useState(departure);
    const [localArrival, setLocalArrival] = useState(arrival);

    useEffect(() => {
        dispatch(setDepartureDate(''));
        dispatch(setReturnDate(''));
    }, [tripType, dispatch]); // срабатывает при изменении tripType


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(setDeparture(localDeparture));
        dispatch(setArrival(localArrival));
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
                <label>
                    Departure
                    <CityAutocomplete
                        value={localDeparture}
                        onChange={setLocalDeparture}
                        placeholder="Your City/Station"
                        excludeCity={localArrival}
                    />
                </label>

                <label>
                    Arrival
                    <CityAutocomplete
                        value={localArrival}
                        onChange={setLocalArrival}
                        placeholder="Where to?"
                        excludeCity={localDeparture}

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