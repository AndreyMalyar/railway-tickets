import createMockTrains from "../../data/trainData.ts";
import { useNavigate } from "react-router-dom";
import RouteInfo from "../../components/RouteInfo.tsx";
import { useAppDispatch } from "../../store/hooks.ts";
import { setSelectedTrain, setSelectedClass } from "../../store/slices/bookingSlice.ts";


const trains = createMockTrains("New Delhi", "Lucknow", "Nov 16", "Nov 17");


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
    const onClick = (trainId: number, classType: string) => {
        dispatch(setSelectedTrain(trainId.toString()));
        dispatch(setSelectedClass(classType));
        navigate('/review-booking');
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
                                    <span className="train-card__btn-content">{classItem.type}<span>{classItem.status} - {classItem.available}</span></span>
                                    <span className="train-card__btn-content">Tatkal<span className="train-card__btn-content_price">₹{classItem.price}</span></span>
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