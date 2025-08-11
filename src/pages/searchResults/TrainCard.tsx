import RouteInfo from "./RouteInfo.tsx";
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import { setSelectedTrain, setSelectedClass } from "../../store/slices/bookingSlice.ts";
import { useNavigate } from "react-router-dom";
import {calculateArrival} from "../../utilits/calculateArrival.ts";

type ClassType = "3A" | "2A" | "1A";
const getClassColor = (type: ClassType) => {
    const colors: Record<ClassType, string> = {
        "3A": "#7DCFB6",
        "2A": "#FBD1A2",
        "1A": "#F79256"
    }
    return colors[type]
}

function TrainCards() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // Данные для запроса из booking
    const { departure, arrival, departureDate } = useAppSelector(state => state.booking);

    // Данные поездов
    const { trainData } = useAppSelector(state => state.railway);


    const onClick = (trainId: number, classType: string) => {
        dispatch(setSelectedTrain(trainId.toString()));
        dispatch(setSelectedClass(classType));
        navigate('/review-booking');
    }


    return (
        <div className="train-cards">
            <h2 className="train-cards__title">Available Trains</h2>
            <div className="train-cards__box">
                {trainData.map(item => {
                    const { arrivalTime, arrivalDate } = calculateArrival(
                        departureDate,
                        item.departure.time,
                        item.duration
                    );

                    return (
                    <div className="train-card" key={item.id}>
                        <p className="train-card__title">{item.number} – {item.name}</p>
                        <p className="train-card__runsOn">Runs on</p>
                        <p className="train-card__runsOn-description">{item.runsOn}</p>
                        <RouteInfo
                            departure={{
                                ...item.departure,
                                date: departureDate,
                                station: departure
                            }}
                            arrival={{
                                ...item.arrival,
                                time: arrivalTime,           // расчетное время прибытия
                                date: arrivalDate,           // расчетная дата прибытия
                                station: arrival,
                            }}
                            duration={item.duration}
                        />
                        <div className="train-card__class-list">
                            {item.classes.map(classItem => (
                                <button
                                    type="button"
                                    onClick={() => onClick(item.id, classItem.type)}
                                    key={classItem.type}
                                    style={{backgroundColor: getClassColor(classItem.type as ClassType)}}
                                    className="train-card__btn"
                                >
                                    <span className="train-card__btn-content">
                                        <span className="train-card__btn-content_select">{classItem.type}</span>
                                        {classItem.status} - {classItem.available}
                                    </span>
                                    <span className="train-card__btn-content">
                                        Tatkal<span className="train-card__btn-content_select">₹{classItem.price}</span>
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                )})}
            </div>
        </div>
    )
}

export default TrainCards;