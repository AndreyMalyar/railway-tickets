import GlobsButton from "../GlobsButton.tsx";
import TripTypeSelector from "./TripTypeSelector.tsx";
import { useAppSelector, useAppDispatch} from "../../store/hooks.ts";
import { setTripType } from "../../store/slices/bookingSlice.ts";
import { useNavigate } from "react-router-dom";
import { setDeparture, setArrival, setDepartureDate, setReturnDate } from "../../store/slices/bookingSlice.ts";
import './styleForm.scss';
import DateRangePicker from "./DateRangePicker.tsx";
import CityAutocomplete from "./CityAutocomplete.tsx";
import React, { useState } from "react";


function Form(){
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { tripType, departure, arrival, departureDate, returnDate, passenger } = useAppSelector(state => state.booking);

    const [isDepartureValid, setIsDepartureValid] = useState(!!departure);
    const [isArrivalValid, setIsArrivalValid] = useState(!!arrival);
    const [isDateValid, setIsDateValid] = useState(!!departureDate);

    const isFormValid = isDepartureValid && isArrivalValid && isDateValid;



    const handleDepartureChange = (value: string) => {
        dispatch(setDeparture(value));
    };

    const handleArrivalChange = (value: string) => {
        dispatch(setArrival(value));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();


        navigate('/search-results');
    };


    return (
        <>
            {!isFormValid && (
                <div className="form__error">
                    Проверьте правильность заполнения формы
                </div>
            )}
            <form className="form" onSubmit={handleSubmit}>
                <TripTypeSelector
                    className="form-tripType"
                    passenger={passenger}
                    value={tripType}
                    onChange={(value) => {
                        dispatch(setTripType(value));
                        dispatch(setDepartureDate(""));
                        dispatch(setReturnDate(""));
                    }}
                />

                <fieldset className="form__fieldset">
                    <label>
                        Departure
                        <CityAutocomplete
                            value={departure}
                            onChange={handleDepartureChange}
                            onValidationChange={setIsDepartureValid}
                            placeholder="Your City/Station"
                            excludeCity={arrival}
                        />
                    </label>

                    <label>
                        Arrival
                        <CityAutocomplete
                            value={arrival}
                            onChange={handleArrivalChange}
                            onValidationChange={setIsArrivalValid}
                            placeholder="Where to?"
                            excludeCity={departure}

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
                        onValidationChange={setIsDateValid}
                    />


                </fieldset>
                <GlobsButton
                    className="form__button"
                    label='Ticket, Please!'
                    type="submit"
                    disabled={!isFormValid}
                />
            </form>
        </>

    )
}

export default Form