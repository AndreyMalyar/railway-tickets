// Функция для форматирования времени из "23:25" в "11:25 pm"
export const formatTime = (time24: string): string => {
    const [hours, minutes] = time24.split(':');
    const hour24 = parseInt(hours);
    const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
    const ampm = hour24 >= 12 ? 'pm' : 'am';
    return `${hour12}:${minutes} ${ampm}`;
};

// Функция для вычисления времени прибытия
export const calculateArrivalTime = (departureTime: string, durationHours: number): string => {
    const [hours, minutes] = departureTime.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));

    // Добавляем часы
    date.setHours(date.getHours() + durationHours);

    // Форматируем обратно в "HH:MM"
    const newHours = date.getHours().toString().padStart(2, '0');
    const newMinutes = date.getMinutes().toString().padStart(2, '0');

    return formatTime(`${newHours}:${newMinutes}`);
};

// Функция для вычисления даты прибытия
export const calculateArrivalDate = (departureDate: string, departureTime: string, durationHours: number): string => {
    const [hours, minutes] = departureTime.split(':');

    // Создаем дату с точным временем отправления
    const date = new Date(departureDate + 'T00:00:00');
    date.setHours(parseInt(hours), parseInt(minutes));

    // Добавляем часы поездки
    date.setHours(date.getHours() + durationHours);

    return date.toISOString().split('T')[0];
};

// Добавляем функцию форматирования даты
export const formatDate = (dateString: string): string => {
    const date = new Date(dateString + 'T12:00:00');
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
    });
};

// Обновляем transformTrainData
export const transformTrainData = (
    rawTrains: any[],
    departure: string,
    arrival: string,
    departureDate: string
) => {
    return rawTrains.map(train => ({
        id: train.id,
        number: train.number,
        name: train.name,
        runsOn: train.runsOn,
        departure: {
            time: formatTime(train.departureTime),
            station: departure,
            date: formatDate(departureDate)
        },
        arrival: {
            time: calculateArrivalTime(train.departureTime, train.durationHours),
            station: arrival,
            date: formatDate(calculateArrivalDate(departureDate, train.departureTime, train.durationHours)) // ← передаем departureTime
        },
        duration: `${train.durationHours} hours`,
        classes: train.classes
    }));
};