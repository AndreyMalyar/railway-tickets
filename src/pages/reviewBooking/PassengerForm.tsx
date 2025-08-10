import { useAppDispatch } from "../../store/hooks.ts";
import { useFormik } from "formik";
import * as Yup from "yup";
import { setPassengerEmail, setPassengerName } from "../../store/slices/bookingSlice.ts";

const validationSchema = Yup.object({
    fullName: Yup.string().trim().required("Проверьте правильность заполнения формы"),
    email: Yup.string().trim().email('Неверный email').required("Проверьте правильность заполнения формы")
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
                <label className="passenger-form__label">
                    Full Name
                    <input
                        className={`passenger-form__input ${formik.touched.fullName && formik.errors.fullName ? 'passenger-form__input_error' : ''}`}
                        type="text"
                        name="fullName"
                        value={formik.values.fullName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Full Name"
                    />
                </label>

                <label className="passenger-form__label">
                    Email
                    <input
                        className={`passenger-form__input ${formik.touched.email && formik.errors.email ? 'passenger-form__input_error' : ''}`}
                        type="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Email"
                    />
                </label>

                <button className="passenger-form__submit" type="submit">Submit</button>

                {((formik.errors.email && formik.touched.email) || (formik.errors.fullName && formik.touched.fullName)) && (
                    <div className="passenger__error">
                        {formik.errors.email || formik.errors.fullName}
                    </div>
                )}
            </form>
        </div>

    )
}

export default PassengerForm