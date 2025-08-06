import {useState, useRef, useEffect} from "react";
import cities from "../../data/cityData.ts"
import './styleCity.scss';


interface ICityAutocomplete {
    value: string;
    onChange: (value: string) => void;
    onValidationChange: (isValid: boolean) => void;
    placeholder?: string;
    className?: string;
    excludeCity?: string; // исключить этот город из списка
}

function CityAutocomplete({ value, onChange, onValidationChange, placeholder, className, excludeCity }: ICityAutocomplete) {
    const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
    const [hasError, setHasError] = useState(false)
    const timeoutRef = useRef<number | null>(null);

    const filteredCities = cities
        .filter(city => city.name.toLowerCase().startsWith(value.toLowerCase()))
        .filter(city => !excludeCity || city.name !== excludeCity) // исключаем выбранный город
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
                value={value}
                onChange={(e) => {
                    let inputValue = e.target.value;
                    inputValue = inputValue.replace(/[а-яё]/gi, '');
                    if(inputValue.length > 0) { inputValue = inputValue.charAt(0).toUpperCase() + inputValue.slice(1); }
                    onChange(inputValue);
                }}
                onFocus={() => setCityDropdownOpen(true)}
                onBlur={() => {
                    timeoutRef.current = setTimeout(() => setCityDropdownOpen(false), 300);
                    const isValid = value.trim() !== '' && cities.some(city => city.name === value)
                    setHasError(!isValid);
                    onValidationChange(isValid)
                }}
                placeholder={placeholder}
                className={`city-autocomplete__input ${hasError ? 'city-autocomplete__input--error' : ''}`}
            />

            {cityDropdownOpen && value.length > 0 && filteredCities.length > 0 && (
                <ul className="city-autocomplete__dropdown">
                    {filteredCities.map(city => (
                        <li
                            key={city.id}
                            onClick={() => {
                                onChange(city.name);
                                setCityDropdownOpen(false);
                                // Сбрасываем ошибку при выборе города из списка
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