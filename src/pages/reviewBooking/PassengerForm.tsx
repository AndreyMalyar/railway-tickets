import { useAppDispatch } from "../../store/hooks.ts";
import { useFormik } from "formik";
import * as Yup from "yup";
import { setPassengerEmail, setPassengerName } from "../../store/slices/bookingSlice.ts";

const validationSchema = Yup.object({
    fullName: Yup.string().trim().required("Имя обязательно"),
    email: Yup.string().trim().email('Неверный email').required('Email обязателен')
})

function PassengerForm(){
    const dispatch = useAppDispatch();
    //Formik hook
    const formik = useFormik({
        initialValues: {
            fullName: "",
            email: "",
        },
        validationSchema,
        onSubmit: (values) => {
            const normalizedName = values.fullName
                .toLowerCase()
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

            dispatch(setPassengerName(normalizedName));
            dispatch(setPassengerEmail(values.email.toLowerCase()));
        }
    })

    return (
        <div className="passenger-form">
            <h3 className="passenger-form__title">Passenger</h3>
            <p className="passenger-form__subtitle">Please enter your contact info</p>
            <form className="passenger-form__form" onSubmit={formik.handleSubmit}>
                <label className="passenger-form__label">Full Name</label>
                <input
                    className="passenger-form__input"
                    type="text"
                    name="fullName"
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Full Name"
                />
                {formik.errors.fullName && formik.touched.fullName && (
                    <div className="error">{formik.errors.fullName}</div>
                )}

                <label className="passenger-form__label">Email</label>
                <input
                    className="passenger-form__input"
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Email"
                />
                {formik.errors.email && formik.touched.email && (
                    <div className="error">{formik.errors.email}</div>
                )}
                <button className="passenger-form__submit" type="submit">Submit</button>
            </form>
        </div>

    )
}

export default PassengerForm