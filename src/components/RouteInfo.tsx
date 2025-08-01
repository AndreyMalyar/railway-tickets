import type {TrainStation} from "../data/trainData.ts";

type RouteInfoType = {
    departure: TrainStation;
    arrival: TrainStation;
    duration: string;
}


function RouteInfo({departure, arrival, duration}: RouteInfoType){


    const showTrainStation = (item: TrainStation) => {
        return (
            <>
                <p className="routeInfo-item__data">{item.date}</p>
                <p className="routeInfo-item__time">{item.time}</p>
                <p className="routeInfo-item__station">{item.station}</p>
            </>
        )
    }
    return (
        <div className="routeInfo__box">
            <div className="routeInfo-item">
                {showTrainStation(departure)}
            </div>
            <span className="routeInfo__duration">{duration}</span>
            <div className="routeInfo-item_right">
                {showTrainStation(arrival)}
            </div>
        </div>
    )
}

export default RouteInfo