import type {FormType} from "./typeForm.ts";

const personIcon = <svg width="22" height="32" viewBox="0 0 22 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="11" cy="11" r="4" fill="#5E4AE3"/>
    <path
        d="M5 24C3.89543 24 2.97435 23.0907 3.24685 22.0202C4.12788 18.5595 7.26504 16 11 16C14.735 16 17.8721 18.5595 18.7531 22.0202C19.0257 23.0907 18.1046 24 17 24H5Z"
        fill="#5E4AE3"/>
</svg>

interface ITripTypeSelector {
    className: string;
    passenger: number;
    value: FormType;
    onChange: (value: FormType) => void;
}

function TripTypeSelector({className, passenger, value, onChange}: ITripTypeSelector) {


    return (
        <fieldset className={className}>
            <label htmlFor="roundTrip">
                <input
                    type='radio'
                    name='tripType'
                    id='roundTrip'
                    value="roundTrip"
                    checked={value === 'roundTrip'}
                    onChange={() => onChange('roundTrip')}
                />
                Round trip
            </label>

            <label htmlFor="oneWay">
                <input
                    type='radio'
                    name='tripType'
                    id='oneWay'
                    value="oneWay"
                    checked={value === 'oneWay'}
                    onChange={() => onChange('oneWay')}
                />
                One Way
            </label>

            <label htmlFor="person">
                {personIcon}
                <button type="button">-</button>
                <input type="number" name="person" value={passenger} readOnly/>
                <button type="button">+</button>
            </label>

        </fieldset>
    )
}

export default TripTypeSelector;