import { useAppSelector } from "../../store/hooks.ts";
import createMockTrains from "../../data/trainData"
import RouteDetails from "../../components/RouteDetails.tsx";

function BoardingDetails (){
    const {departure, arrival, departureDate, returnDate, selectedTrain, selectedClass} = useAppSelector(state => state.booking);

    const trains = createMockTrains(departure, arrival, departureDate, returnDate);
    const selectedTrainData = trains.find(train => train.id.toString() === selectedTrain);

    if (!selectedTrainData) {
        return <div className="review">Train not found</div>;
    }

    const selectedNameData = `${selectedTrainData.number} - ${selectedTrainData.name}`;

    return (
        <div className="review">
            <h3 className="review__title">Boarding Details</h3>
            <p className="review__train-info">
                {selectedNameData}
                <span className="review__train-class">Class {selectedClass} & Tatkal Quota</span>
            </p>
            <RouteDetails />
        </div>
    )
}

export default BoardingDetails