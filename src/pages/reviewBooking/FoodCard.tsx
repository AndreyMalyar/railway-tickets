import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { setSelectedFood } from "../../store/slices/bookingSlice";
import { useRailwayData } from "../../hooks/useRailwayData"
import Loader from "../../components/Loader";



function FoodCard() {
    const dispatch = useAppDispatch();
    const { selectedFood } = useAppSelector(state => state.booking)
    const { food } = useAppSelector(state => state.railway);
    const { loadingMessage, hasRequiredData } = useRailwayData(['food']);

    // Если данных нет - показываем лоадер
    if (!hasRequiredData) {
        return <Loader message={loadingMessage} height="200px" />;
    }

    const onClick = (id: number) => {
        if (id === selectedFood) {
            dispatch(setSelectedFood(null));
        } else {
            dispatch(setSelectedFood(id));
        }
    }

    const setClass = (id: number) => {
        if(selectedFood === null || selectedFood === id) {
            return "";
        } else {
            return "food-card__content_inactive"
        }
    }

    const foods = food.map(item => {
        return (
            <div key={item.id} className={ `food-card__content ${setClass(item.id)}` } >
                <div className="food-card__wrap">
                    <img src={`https://railway-tickets-api.onrender.com${item.image}`} className="food-card__img" alt={item.title}/>
                </div>
                <div className="food-card__info">
                    <p className="food-card__info-title">{item.title}</p>
                    <p className="food-card__info-price">₹{item.price}.00</p>
                    <button type="button" onClick={() => onClick(item.id)} className="food-card__btn">{item.id === selectedFood ? "Remove" : "Add to Ticket"}</button>
                </div>
            </div>
        )
    })

    return (
        <div className="food-card">
            {foods}
        </div>
    )
}

export default FoodCard;