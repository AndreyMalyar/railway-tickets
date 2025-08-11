import {useState, useRef, useEffect} from "react";
import './styleCity.scss';
import { useAppSelector } from "../../store/hooks.ts";

interface ICityAutocomplete {
    value: string;
    onChange: (value: string) => void;
    onValidationChange: (isValid: boolean) => void;
    placeholder?: string;
    className?: string;
    excludeCity?: string;
}

function CityAutocomplete({ value, onChange, onValidationChange, placeholder, className, excludeCity }: ICityAutocomplete) {
    const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
    const [hasError, setHasError] = useState(false)
    const timeoutRef = useRef<number | null>(null);
    const { cities } = useAppSelector(state => state.railway)

    const getCityNameFromValue = (val: string) => {
        return val.includes(' - ') ? val.split(' - ')[0] : val;
    }

    const inputCityName = getCityNameFromValue(value);

    const filteredCities = cities
        .filter(city => city.name.toLowerCase().startsWith(inputCityName.toLowerCase()))
        .filter(city => {
            if (!excludeCity) return true;
            const excludeCityName = getCityNameFromValue(excludeCity);
            return city.name !== excludeCityName;
        })
        .slice(0, 4);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
        <div className={`city-autocomplete ${className || ''}`}>
            <input
                type="text"
                value={inputCityName}
                onChange={(e) => {
                    let inputValue = e.target.value;
                    inputValue = inputValue.replace(/[а-яё]/gi, '');
                    if(inputValue.length > 0) { inputValue = inputValue.charAt(0).toUpperCase() + inputValue.slice(1); }
                    onChange(inputValue);
                }}
                onFocus={() => setCityDropdownOpen(true)}
                onBlur={() => {
                    timeoutRef.current = setTimeout(() => setCityDropdownOpen(false), 300);
                    const isValid = inputCityName.trim() !== '' && cities.some(city => city.name === inputCityName);
                    setHasError(!isValid);
                    onValidationChange(isValid)
                }}
                placeholder={placeholder}
                className={`city-autocomplete__input ${hasError ? 'city-autocomplete__input--error' : ''}`}
            />

            {cityDropdownOpen && inputCityName.length > 0 && filteredCities.length > 0 && (
                <ul className="city-autocomplete__dropdown">
                    {filteredCities.map(city => (
                        <li
                            key={city.id}
                            onClick={() => {
                                const cityWithCode = `${city.name} - ${city.code}`;
                                onChange(cityWithCode);
                                setCityDropdownOpen(false);
                                setHasError(false);
                                onValidationChange(true);
                            }}
                            className="city-autocomplete__item"
                        >
                            {city.name} ({city.code})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default CityAutocomplete;