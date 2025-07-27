import { useState } from "react";
import "./styleCalendar.scss";

const monthArr = [
    "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];

const daysOfWeekArr = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];

interface CalendarProps {
    onDateSelect: (date: string) => void;
    selectedDate?: string;
    mode: 'single' | 'range'; // одна дата или диапазон
}


function Calendar({ onDateSelect, selectedDate, mode }: CalendarProps) {
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

    const generateDays = () => {
        const days = [];
        const firstDayOfMonth = new Date(currentYear, currentMonth, 0).getDay(); // день недели первого дня
        const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); // количество дней в месяце
        const lastDayOfPrevMonth = new Date(currentYear, currentMonth, 0).getDate(); // последний день предыдущего месяца

        // Предыдущие дни месяца
        for (let i = firstDayOfMonth; i > 0; i--) {
            days.push(
                <div key={`prev-${lastDayOfPrevMonth - i + 1}`} className="calendar__day calendar__day--passive">
                    {lastDayOfPrevMonth - i + 1}
                </div>
            );
        }

        // Основные дни месяца
        for (let day = 1; day <= lastDayOfMonth; day++) {
            const dateString = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

            days.push(
                <div
                    key={day}
                    className="calendar__day calendar__day--active"
                    onClick={() => onDateSelect(dateString)}
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
            <div className="calendar__header">
                <button onClick={prevMonth}>←</button>
                <span>{currentMonth + 1} {currentYear}</span>
                <button onClick={nextMonth}>→</button>
            </div>

            {/* Добавьте дни недели */}
            <div className="calendar__days-of-week">
                {daysOfWeekArr.map(day => (
                    <div key={day} className="calendar__day-of-week">
                        {day}
                    </div>
                ))}
            </div>

            <div className="calendar__body">
                {generateDays()} {/* вызываем функцию генерации */}
            </div>
        </div>
    )
}

export default Calendar