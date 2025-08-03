import { salesIcon }  from "./icons"
import { useAppSelector, useAppDispatch} from "../../store/hooks";
import { setSelectedPromoCode } from "../../store/slices/bookingSlice";


function OffersSection(){
    const dispatch = useAppDispatch();
    const { selectedPromoCode } = useAppSelector(state => state.booking);

    const onClick = (code: string) => {
        if (selectedPromoCode === code) {
            dispatch(setSelectedPromoCode(null));
        } else {
            dispatch(setSelectedPromoCode(code));
        }
    }

    return (
        <div className="offers">
            <h3 className="offers__title">Offers</h3>
            <div className="offers__item">
                <p className="offers__item-text">{salesIcon}50% off up to ₹100 | Use code BOOKNOW</p>
                <button onClick={() => onClick('BOOKNOW')} type="button" className="offers__apply-btn">
                    {selectedPromoCode === 'BOOKNOW' ? 'Remove' : 'Apply'}
                </button>
            </div>
            <div className="offers__item">
                <p className="offers__item-text">{salesIcon}20% off | Use code FIRSTTIME</p>
                <button onClick={() => onClick('FIRSTTIME')} type="button" className="offers__apply-btn">
                    {selectedPromoCode === 'FIRSTTIME' ? 'Remove' : 'Apply'}
                </button>
            </div>
        </div>
    )
}

export default OffersSection;