import { useState } from 'react';
import Calendar from './Calendar';

interface DateRangePickerProps {
    departValue: string;
    returnValue: string;
    onDepartChange: (date: string) => void;
    onReturnChange: (date: string) => void;
}

function DateRangePicker({ departValue, returnValue, onDepartChange, onReturnChange }: DateRangePickerProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleDateSelect = (departDate: string, returnDate?: string) => {
        onDepartChange(departDate);
        if (returnDate) {
            onReturnChange(returnDate);
            setIsOpen(false); // закрываем ТОЛЬКО когда обе даты выбраны
        }
    };

    return (
        <div className="date-range-picker">
            <div className="date-range-picker__inputs">
                <div className="date-range-picker__input" onClick={() => setIsOpen(true)}>
                    <span>📅</span>
                    <span>{departValue || 'Depart'}</span>
                </div>
                <div className="date-range-picker__input" onClick={() => setIsOpen(true)}>
                    <span>📅</span>
                    <span>{returnValue || 'Return'}</span>
                </div>
            </div>

            {isOpen && (
                <div className="date-range-picker__calendar">
                    <Calendar
                        onDateSelect={handleDateSelect}
                        mode="range"
                    />
                </div>
            )}
        </div>
    );
}

export default DateRangePicker;