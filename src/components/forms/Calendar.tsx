import { useState } from "react";
import "./styleCalendar.scss";

const monthArr = [
    "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];

const daysOfWeekArr = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];

interface CalendarProps {
    onDateSelect: (departDate: string, returnDate?: string) => void;
    onClose: () => void
    selectedDate?: string;
    mode: 'single' | 'range'; // одна дата или диапазон
}


function Calendar({ onDateSelect, onClose,  mode }: CalendarProps) {
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
            setSelectedDates(prev => ({ ...prev, depart: dateString }));
            onDateSelect(dateString); // сразу передаем данные
        } else {
            // для range mode - НЕ вызываем onDateSelect, только обновляем внутреннее состояние
            if (selectionStep === 'depart') {
                setSelectedDates(prev => ({ ...prev, depart: dateString }));
                setSelectionStep('return');
                onDateSelect(dateString); // передаем depart сразу
            } else {
                //Проверяем что Return дата позже Depart
                if (dateString <= selectedDates.depart) {
                    // Если Return не позже Depart - игнорируем клик или показываем ошибку
                    return;
                }
                setSelectedDates(prev => ({ ...prev, return: dateString }));
                onDateSelect(selectedDates.depart, dateString); // передаем обе даты
            }
        }
    };

    const handleApply = () => {
        onClose(); // закрываем календарь
    };

    const handleReset = () => {
        setSelectedDates({ depart: '', return: '' });
        setSelectionStep('depart');
        // Очищаем данные в форме тоже
        onDateSelect('', '');
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
        const correctedFirstDay = (firstDayOfMonth === 0) ? 6 : firstDayOfMonth - 1;
        const lastDayOfMonth = new Date(adjustedYear, adjustedMonth + 1, 0).getDate();
        const lastDayOfPrevMonth = new Date(adjustedYear, adjustedMonth, 0).getDate();

        // Создаем сегодняшнюю дату один раз
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Предыдущие дни месяца
        for (let i = correctedFirstDay; i > 0; i--) {
            days.push(
                <div key={`prev-${adjustedMonth}-${lastDayOfPrevMonth - i + 1}`} className="calendar__day calendar__day--passive">
                    {lastDayOfPrevMonth - i + 1}
                </div>
            );
        }

        // ОДИН цикл для основных дней с валидацией
        for (let day = 1; day <= lastDayOfMonth; day++) {
            const dateString = `${adjustedYear}-${(adjustedMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

            const currentDate = new Date(adjustedYear, adjustedMonth, day);
            const isPastDate = currentDate < today;

            // Проверка Return даты
            const isDepartSelected = selectedDates.depart !== '';
            const isBeforeOrEqualDepart = isDepartSelected && dateString <= selectedDates.depart;
            const isInvalidReturn = mode === 'range' && selectionStep === 'return' && isBeforeOrEqualDepart;

            const isDisabled = isPastDate || isInvalidReturn;

            const isSelected = mode === 'single'
                ? selectedDates.depart === dateString
                : selectedDates.depart === dateString || selectedDates.return === dateString;

            // Если дата выбрана - она не должна быть disabled
            const finalDisabled = isDisabled && !isSelected;

            days.push(
                <div
                    key={`${adjustedMonth}-${day}`}
                    className={`calendar__day calendar__day--active ${isSelected ? 'calendar__day--selected' : ''} ${finalDisabled ? 'calendar__day--disabled' : ''}`}
                    onClick={() => !finalDisabled && handleDateClick(dateString)}
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

            {/* Заголовок с навигацией */}
            <div className="calendar__header">
                <button type="button" onClick={prevMonth}>←</button>
                <div className="calendar__months-titles">
                    <span>{monthArr[currentMonth]} {currentYear}</span>
                    <span>{monthArr[(currentMonth + 1) % 12]} {currentMonth === 11 ? currentYear + 1 : currentYear}</span>
                </div>
                <button type="button" onClick={nextMonth}>→</button>
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
                <button type="button" className="calendar__reset" onClick={handleReset}>Reset</button>
                <button type="button" className="calendar__apply" onClick={handleApply}>Apply</button>
            </div>
        </div>
    )
}

export default Calendar