import { useAppSelector } from "../store/hooks.ts";
import { calculateArrival } from "../utilits/calculateArrival.ts";
import { formatDate } from "../utilits/dateFormatter.ts";

function RouteDetails() {
    const { selectedTrain, departure, arrival, departureDate } = useAppSelector(state => state.booking);
    const { trainData } = useAppSelector(state => state.railway);

    // Находим выбранный поезд
    const selectedTrainData = trainData.find(train => train.id.toString() === selectedTrain);

    if (!selectedTrainData || !selectedTrain) {
        return null; // или <div>No train selected</div>
    }

    // Рассчитываем время и дату прибытия
    const { arrivalTime, arrivalDate } = calculateArrival(
        departureDate,
        selectedTrainData.departure.time,
        selectedTrainData.duration
    );

    const showTrainStation = (date: string, time: string, station: string) => {
        return (
            <>
                <p className="routeInfo-item__data">{formatDate(date)}</p>
                <p className="routeInfo-item__time">{time}</p>
                <p className="routeInfo-item__station">{station}</p>
            </>
        )
    }

    return (
        <div className="routeInfo__box">
            <div className="routeInfo-item">
                {showTrainStation(departureDate, selectedTrainData.departure.time, departure)}
            </div>
            <span className="routeInfo__duration">{selectedTrainData.duration}</span>
            <div className="routeInfo-item_right">
                {showTrainStation(arrivalDate, arrivalTime, arrival)}
            </div>
        </div>
    )
}

export default RouteDetails;