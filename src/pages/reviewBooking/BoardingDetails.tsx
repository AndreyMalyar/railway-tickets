import { useAppSelector } from "../../store/hooks.ts";
import RouteDetails from "../../components/RouteDetails.tsx";
import { useRailwayData } from "../../hooks/useRailwayData.ts";
import Loader from "../../components/Loader.tsx";

function BoardingDetails (){
    const { selectedTrain, selectedClass } = useAppSelector(state => state.booking);
    const { trainData } = useAppSelector(state => state.railway);
    const { loadingMessage, hasRequiredData } = useRailwayData(['trainData']);

    // Если данных нет - показываем лоадер
    if (!hasRequiredData) {
        return <Loader message={loadingMessage} height="100px" />;
    }

    // Находим выбранный поезд из нового store
    const selectedTrainData = trainData.find(train => train.id.toString() === selectedTrain);

    if (!selectedTrainData) {
        return <div className="review">Train not found</div>;
    }


    return (
        <>
            <h3 className="review__title">Boarding Details</h3>
            <p className="review__train-info">
                {selectedTrainData.number} - {selectedTrainData.name}
                <span className="review__train-class">Class {selectedClass} & Tatkal Quota</span>
            </p>
            <RouteDetails />
        </>
    )
}

export default BoardingDetails