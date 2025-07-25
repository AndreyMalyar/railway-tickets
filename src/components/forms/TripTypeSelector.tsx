import type {FormType} from "./typeForm.ts";

const personIcon = <svg width="22" height="32" viewBox="0 0 22 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="11" cy="11" r="4" fill="#5E4AE3"/>
    <path
        d="M5 24C3.89543 24 2.97435 23.0907 3.24685 22.0202C4.12788 18.5595 7.26504 16 11 16C14.735 16 17.8721 18.5595 18.7531 22.0202C19.0257 23.0907 18.1046 24 17 24H5Z"
        fill="#5E4AE3"/>
</svg>

interface ITripTypeSelector {
    value: FormType;
    onChange: (value: FormType) => void;
}

function TripTypeSelector({value, onChange}: ITripTypeSelector) {

    return (
        <fieldset>
            <label htmlFor="roundTrip">Round trip</label>
            <input
                type='radio'
                name='tripType'
                id='roundTrip'
                value="roundTrip"
                checked={value === 'roundTrip'}
                onChange={() => onChange('roundTrip')}
            />
            <label htmlFor="oneWay">One Way</label>
            <input
                type='radio'
                name='tripType'
                id='oneWay'
                value="oneWay"
                checked={value === 'oneWay'}
                onChange={() => onChange('oneWay')}
            />
            <label htmlFor="person">{personIcon}</label>
            <input type="number" name="person" />
        </fieldset>
    )
}
export default TripTypeSelector;