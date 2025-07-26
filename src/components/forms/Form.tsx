import {useState} from "react";
import GlobsButton from "../GlobsButton.tsx";
import TripTypeSelector from "./TripTypeSelector.tsx";
import type {FormType} from "./typeForm.ts";


function Form(){
    const [tripType, setTripType] = useState<FormType>('roundTrip');


    return (
        <form className="section-home__form">
            <TripTypeSelector value={tripType} onChange={setTripType} />
            <fieldset>
                <label htmlFor="departure">Departure</label>
                <input
                    type="text"
                    name="departure"
                    id="departure"
                    placeholder="Your City/Station"
                />
                <label htmlFor="arrival">Arrival</label>
                <input
                    type="text"
                    name="arrival"
                    id="arrival"
                    placeholder="Where to?"
                />
            </fieldset>
            <fieldset>
                <legend>Pick your lucky day</legend>
                <label htmlFor="depart">Depart</label>
                <input type="date" name="depart" id="depart"/>


                {tripType === 'roundTrip' && (
                    <>
                        <label htmlFor="return">Return</label>
                        <input type="date" name="return" id="return" />
                    </>
                )}
            </fieldset>
            <GlobsButton label='Ticket, Please'/>
        </form>
    )
}

export default Form