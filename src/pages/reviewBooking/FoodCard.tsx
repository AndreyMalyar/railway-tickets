import foodData from "../../data/foodData"
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { setSelectedFood } from "../../store/slices/bookingSlice"


function FoodCard() {
    const dispatch = useAppDispatch();
    const { selectedFood } = useAppSelector(state => state.booking)

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
        //return selectedFood !== null && selectedFood !== id ? "food-card__content_notActive" : "";
    }

    const foods = foodData.map(food => {
        return (
            <div key={food.id} className={ `food-card__content ${setClass(food.id)}` } >
                <div className="food-card__wrap">
                    <img src={food.image} className="food-card__img" alt={food.title}/>
                </div>
                <div className="food-card__info">
                    <p className="food-card__info-title">{food.title}</p>
                    <p className="food-card__info-price">₹{food.price}.00</p>
                    <button type="button" onClick={() => onClick(food.id)} className="food-card__btn">{food.id === selectedFood ? "Remove" : "Add to Ticket"}</button>
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