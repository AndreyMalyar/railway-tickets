export const calculateArrival = (
    departureDate: string,    // "2025-08-14"
    departureTime: string,    // "11:45 pm"
    duration: string          // "8 hours"
) => {
    // Парсим время отправления
    const [time, ampm] = departureTime.split(' ');
    const [hours, minutes] = time.split(':');
    let hour24 = parseInt(hours);

    // Конвертируем в 24-часовой формат
    if (ampm === 'pm' && hour24 !== 12) hour24 += 12;
    if (ampm === 'am' && hour24 === 12) hour24 = 0;

    // Создаем дату отправления
    const departureDateTime = new Date(departureDate);
    departureDateTime.setHours(hour24, parseInt(minutes), 0, 0);

    // Добавляем duration (парсим "8 hours" -> 8)
    const durationHours = parseInt(duration.split(' ')[0]);
    departureDateTime.setHours(departureDateTime.getHours() + durationHours);

    // Возвращаем время и дату прибытия
    return {
        arrivalTime: departureDateTime.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        }).toLowerCase(),
        arrivalDate: departureDateTime.toISOString().split('T')[0]
    };
};