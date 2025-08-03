import { useAppSelector } from "../../store/hooks.ts";

function ApplyCode() {
    const { selectedPromoCode } = useAppSelector(state => state.booking)
    console.log(selectedPromoCode)

    return (
        <div className="apply-code">
            <h3 className="apply-code__title">Apply Code</h3>
            <p className="apply-code__code">{selectedPromoCode ? selectedPromoCode : "Enter Code"}</p>
        </div>
    )
}

export default ApplyCode;

