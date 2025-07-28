import { useState } from "react";
import "./styleCalendar.scss";

const monthArr = [
    "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];

const daysOfWeekArr = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];

interface CalendarProps {
    onDateSelect: (departDate: string, returnDate?: string) => void;
    selectedDate?: string;
    mode: 'single' | 'range'; // одна дата или диапазон
}


function Calendar({ onDateSelect, selectedDate, mode }: CalendarProps) {
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());


    // Состояние для выбранных дат
    const [selectedDates, setSelectedDates] = useState({
        depart: '',
        return: ''
    });

    const [selectionStep, setSelectionStep] = useState<'depart' | 'return'>('depart');

    const handleDateClick = (dateString: string) => {
        if (mode === 'single') {
            onDateSelect(dateString); // только для single - сразу закрывается
        } else {
            // для range mode - НЕ вызываем onDateSelect, только обновляем внутреннее состояние
            if (selectionStep === 'depart') {
                setSelectedDates(prev => ({ ...prev, depart: dateString }));
                setSelectionStep('return');
            } else {
                setSelectedDates(prev => ({ ...prev, return: dateString }));
                // НЕ вызываем onDateSelect здесь!
            }
        }
    };

    const handleApply = () => {
        if (mode === 'range') {
            onDateSelect(selectedDates.depart, selectedDates.return); // ТОЛЬКО здесь вызываем
        }
    };

    const handleReset = () => {
        setSelectedDates({ depart: '', return: '' });
        setSelectionStep('depart');
    };

    const generateDays = (year: number, month: number) => {

        // Корректируем месяц если больше 11
        let adjustedYear = year;
        let adjustedMonth = month;

        if (month > 11) {
            adjustedYear = year + Math.floor(month / 12);
            adjustedMonth = month % 12;
        }

        const days = [];
        const firstDayOfMonth = new Date(adjustedYear, adjustedMonth, 1).getDay();
        const correctedFirstDay = (firstDayOfMonth === 0) ? 6 : firstDayOfMonth - 1; // понедельник = 0
        const lastDayOfMonth = new Date(adjustedYear, adjustedMonth + 1, 0).getDate();
        const lastDayOfPrevMonth = new Date(adjustedYear, adjustedMonth, 0).getDate();

        // Предыдущие дни месяца
        for (let i = correctedFirstDay; i > 0; i--) {
            days.push(
                <div key={`prev-${adjustedMonth}-${lastDayOfPrevMonth - i + 1}`} className="calendar__day calendar__day--passive">
                    {lastDayOfPrevMonth - i + 1}
                </div>
            );
        }

        // Основные дни месяца
        for (let day = 1; day <= lastDayOfMonth; day++) {
            const dateString = `${adjustedYear}-${(adjustedMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

            const isSelected = selectedDates.depart === dateString || selectedDates.return === dateString;

            days.push(
                <div
                    key={`${adjustedMonth}-${day}`}
                    className={`calendar__day calendar__day--active ${isSelected ? 'calendar__day--selected' : ''}`}
                    onClick={() => handleDateClick(dateString)}
                >
                    {day}
                </div>
            );
        }

        return days;
    };

    const prevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const nextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    }

    return (
        <div className="calendar">
            {/* Поля для дат сверху */}
            <div className="calendar__inputs">
                <div className={`calendar__input ${selectionStep === 'depart' ? 'calendar__input--active' : ''}`}>
                    <span className="calendar__icon">📅</span>
                    <span>{selectedDates.depart || 'Depart'}</span>
                </div>
                <div className={`calendar__input ${selectionStep === 'return' ? 'calendar__input--active' : ''}`}>
                    <span className="calendar__icon">📅</span>
                    <span>{selectedDates.return || 'Return'}</span>
                </div>
            </div>

            {/* Заголовок с навигацией */}
            <div className="calendar__header">
                <button onClick={prevMonth}>←</button>
                <div className="calendar__months-titles">
                    <span>{monthArr[currentMonth]} {currentYear}</span>
                    <span>{monthArr[(currentMonth + 1) % 12]} {currentMonth === 11 ? currentYear + 1 : currentYear}</span>
                </div>
                <button onClick={nextMonth}>→</button>
            </div>

            {/* Два месяца рядом */}
            <div className="calendar__months">
                {/* Первый месяц */}
                <div className="calendar__month">
                    <div className="calendar__days-of-week">
                        {daysOfWeekArr.map(day => (
                            <div key={day} className="calendar__day-of-week">
                                {day}
                            </div>
                        ))}
                    </div>
                    <div className="calendar__body">
                        {generateDays(currentYear, currentMonth)}
                    </div>
                </div>

                {/* Второй месяц */}
                <div className="calendar__month">
                    <div className="calendar__days-of-week">
                        {daysOfWeekArr.map(day => (
                            <div key={`next-${day}`} className="calendar__day-of-week">
                                {day}
                            </div>
                        ))}
                    </div>
                    <div className="calendar__body">
                        {generateDays(currentYear, currentMonth + 1)}
                    </div>
                </div>
            </div>

            {/* Кнопки с обработчиками */}
            <div className="calendar__actions">
                <button className="calendar__reset" onClick={handleReset}>Reset</button>
                <button className="calendar__apply" onClick={handleApply}>Apply</button>
            </div>
        </div>
    )
}

export default Calendar