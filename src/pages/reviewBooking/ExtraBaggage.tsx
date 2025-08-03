import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { setExtraBaggage } from "../../store/slices/bookingSlice"

function ExtraBaggage(){
    const dispatch = useAppDispatch();
    const { extraBaggage } = useAppSelector(state => state.booking);

    const onClick = () => {
        dispatch(setExtraBaggage(!extraBaggage));
    }

    return (
        <div className="extra-baggage">
            <h3 className="extra-baggage__title">Extra Baggage</h3>
            <button type="button" onClick={onClick} className={"extra-baggage__btn"}>{extraBaggage ? "Remove" : "Add to Ticket"}</button>
        </div>
    )
}

export default ExtraBaggage;