import GlobsButton from "../GlobsButton.tsx";
import TripTypeSelector from "./TripTypeSelector.tsx";
import { useAppSelector, useAppDispatch} from "../../store/hooks.ts";
import { setTripType } from "../../store/slice/formSlice.ts";

function Form(){
    const dispatch = useAppDispatch();
    const tripType = useAppSelector(state => state.form.tripType)

    return (
        <form className="section-home__form">
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