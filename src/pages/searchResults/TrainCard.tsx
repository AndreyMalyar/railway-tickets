import { useEffect } from "react";
import RouteInfo from "../../components/RouteInfo.tsx";
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import { setSelectedTrain, setSelectedClass } from "../../store/slices/bookingSlice.ts";
import { fetchTrains } from "../../store/slices/trainsSlice.ts";
import { useNavigate } from "react-router-dom";

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

    // Данные поездов из trains slice
    const { data: trains, status, error } = useAppSelector(state => state.trains);

    // Загружаем поезда при изменении параметров
    useEffect(() => {
        if (departure && arrival && departureDate) {
            dispatch(fetchTrains({ departure, arrival, departureDate }));
        }
    }, [dispatch, departure, arrival, departureDate]);

    // Выводим в консоль что получилось
    console.log('Trains data:', trains);
    console.log('Status:', status);
    console.log('Error:', error);

    const onClick = (trainId: number, classType: string) => {
        dispatch(setSelectedTrain(trainId.toString()));
        dispatch(setSelectedClass(classType));
        navigate('/review-booking');
    }

    if (status === 'loading') {
        return <div>Loading trains...</div>;
    }

    if (status === 'failure') {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="train-cards">
            <h2 className="train-cards__title">Available Trains</h2>
            <div className="train-cards__box">
                {trains.map(item => (
                    <div className="train-card" key={item.id}>
                        <p className="train-card__title">{item.number} – {item.name}</p>
                        <p className="train-card__runsOn">Runs on</p>
                        <p className="train-card__runsOn-description">{item.runsOn}</p>
                        <RouteInfo departure={item.departure} arrival={item.arrival} duration={item.duration} />
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
                ))}
            </div>
        </div>
    )
}

export default TrainCards;