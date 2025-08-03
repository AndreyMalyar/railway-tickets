
import { useState } from 'react';
import Calendar from './Calendar';

interface DatePickerProps {
    label: string;
    value: string;
    onChange: (date: string) => void;
    id: string;
}

function DatePicker({ label, value, onChange, id }: DatePickerProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleDateSelect = (date: string) => {
        onChange(date);
        setIsOpen(false); // закрываем календарь после выбора
    };

    return (
        <div className="date-picker">
            <label htmlFor={id}>{label}</label>
            <input
                type="text"
                id={id}
                value={value}
                onClick={() => setIsOpen(!isOpen)}
                readOnly
                placeholder="Выберите дату"
            />
            {isOpen && (
                <div className="date-picker__calendar">
                    <Calendar
                        onDateSelect={handleDateSelect}
                        selectedDate={value}
                        mode="single"
                        onClose={() => setIsOpen(false)}
                    />
                </div>
            )}
        </div>
    );
}

export default DatePicker;