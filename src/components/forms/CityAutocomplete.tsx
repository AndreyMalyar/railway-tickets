import {useState, useRef, useEffect} from "react";
import cities from "../../data/cityData.ts"
import './styleCity.scss';


interface ICityAutocomplete {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    excludeCity?: string; // исключить этот город из списка
}

function CityAutocomplete({ value, onChange, placeholder, className, excludeCity }: ICityAutocomplete) {
    const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
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
                onChange={(e) => onChange(e.target.value)}
                onFocus={() => setCityDropdownOpen(true)}
                onBlur={() => {
                    timeoutRef.current = setTimeout(() => setCityDropdownOpen(false), 300);
                }}
                placeholder={placeholder}
                className="city-autocomplete__input"
            />

            {cityDropdownOpen && value.length > 0 && filteredCities.length > 0 && (
                <ul className="city-autocomplete__dropdown">
                    {filteredCities.map(city => (
                        <li
                            key={city.id}
                            onClick={() => {
                                onChange(city.name);
                                setCityDropdownOpen(false);
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