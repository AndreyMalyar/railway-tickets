import RouteInfo from "../../components/RouteInfo.tsx";
import { useAppSelector } from "../../store/hooks.ts";
import createMockTrains from "../../data/trainData"
import { formatDate } from "../../utilits/dateFormatter"

function BoardingDetails (){
    const {departure, arrival, departureDate, returnDate, selectedTrain, selectedClass} = useAppSelector(state => state.booking);

    const trains = createMockTrains(departure, arrival, departureDate, returnDate);
    const selectedTrainData = trains.find(train => train.id.toString() === selectedTrain);

    if (!selectedTrainData) {
        return <div className="review">Train not found</div>;
    }

    const selectedNameData = `${selectedTrainData.number} - ${selectedTrainData.name}`;

    // Форматируем даты в объектах departure и arrival
    const formattedDeparture = {
        ...selectedTrainData.departure,
        date: formatDate(selectedTrainData.departure.date)
    };

    const formattedArrival = {
        ...selectedTrainData.arrival,
        date: formatDate(selectedTrainData.arrival.date)
    };

    return (
        <div className="review">
            <h3 className="review__title">Boarding Details</h3>
            <p className="review__train-info">
                {selectedNameData}
                <span className="review__train-class">Class {selectedClass} & Tatkal Quota</span>
            </p>
            <RouteInfo
                departure={formattedDeparture}
                arrival={formattedArrival}
                duration={selectedTrainData.duration}
            />
        </div>
    )
}

export default BoardingDetails