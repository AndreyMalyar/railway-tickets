import { useFormik } from "formik";
import * as Yup from "yup"
import type { ChangeEvent } from "react";
import {masterCard, visa, security} from "./icons";
import {useNavigate} from "react-router-dom";

const CreditCardSchema = Yup.object({
    cardNumber: Yup.string()
        .matches(/^\d{4} \d{4} \d{4} \d{4}$/, "Номер карты должен содержать 16 цифр")
        .required("Пожалуйста, проверьте правильность заполнения полей карты"),
    expirationDate: Yup.string()
        .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Формат: MM/YY")
        .required("Пожалуйста, проверьте правильность заполнения полей карты"),
    cvc: Yup.string()
        .matches(/^\d{3,4}$/, "CVC должен содержать 3-4 цифры")
        .required("Пожалуйста, проверьте правильность заполнения полей карты")
})

function PaymentMethod() {
    const navigate = useNavigate();

    const formatCardNumber = (value: string) => {
        const cleanValue = value.replace(/\D/g, '');
        // Ограничиваем до 16 цифр
        const limitedValue = cleanValue.slice(0, 16);
        // Добавляем пробелы каждые 4 цифры
        return limitedValue.replace(/(\d{4})(?=\d)/g, '$1 ');
    }

    const handleCardNumberChange = (evt: ChangeEvent<HTMLInputElement>) => {
        const formattedValue = formatCardNumber(evt.target.value);
        formik.setFieldValue('cardNumber', formattedValue);
    };

    const formatExpirationDate = (value: string) => {
        // Убираем все нецифровые символы
        const cleanValue = value.replace(/\D/g, '');
        // Ограничиваем до 4 цифр
        const limitedValue = cleanValue.slice(0, 4);
        // Добавляем слэш после первых двух цифр
        if (limitedValue.length >= 2) {
            return limitedValue.slice(0, 2) + '/' + limitedValue.slice(2);
        }
        return limitedValue;
    };

    const handleExpirationDateChange = (evt: ChangeEvent<HTMLInputElement>) => {
        const formattedValue = formatExpirationDate(evt.target.value);
        formik.setFieldValue('expirationDate', formattedValue);
    };

    //Formik
    const formik = useFormik({
        initialValues: {
            paymentMethod: "creditCard",
            cardNumber: "",
            expirationDate: "",
            cvc: "",
        },
        validationSchema: CreditCardSchema,
        onSubmit: (values) => {
            console.log(values)
            navigate('/success');
        }
    })


    return (
        <div className="payment">
            <h2 className="payment__title">Payment Method</h2>
            <p className="payment__subtitle">Please enter your payment method</p>

            <form onSubmit={formik.handleSubmit} className="payment-form">
                <fieldset
                    className={`${formik.values.paymentMethod === "creditCard" ? "payment__method" : "payment__method--close"}`}>
                    <label className="payment__method-label">
                        <input
                            className="payment__method-radio"
                            type="radio"
                            name="paymentMethod"
                            value="creditCard"
                            checked={formik.values.paymentMethod === "creditCard"}
                            onChange={formik.handleChange}
                        />
                        Credit Card
                        <div className="payment__method-icons">
                            {visa}
                            {masterCard}
                        </div>
                    </label>
                    {formik.values.paymentMethod === "creditCard" && (
                        <fieldset className="credit-card">
                            <label className="credit-card__label credit-card__label--card-number">
                                Card Number
                                <input
                                    className={`credit-card__input ${formik.errors.cardNumber ? 'credit-card__input--error' : ''}`}
                                    type="text"
                                    name="cardNumber"
                                    value={formik.values.cardNumber}
                                    onChange={handleCardNumberChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="0000 0000 0000 0000"
                                />
                            </label>

                            <label className="credit-card__label credit-card__label--expiration-date">
                                Expiration Date
                                <input
                                    className={`credit-card__input ${formik.errors.expirationDate ? 'credit-card__input--error' : ''}`}
                                    type="text"
                                    name="expirationDate"
                                    value={formik.values.expirationDate}
                                    onChange={handleExpirationDateChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="MM / YY"
                                />
                            </label>

                            <label className="credit-card__label credit-card__label--cvc">
                                CVC
                                <input
                                    className={`credit-card__input ${formik.errors.cvc ? 'credit-card__input--error' : ''}`}
                                    type="text"
                                    name="cvc"
                                    value={formik.values.cvc}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="CVC"
                                />
                            </label>
                        </fieldset>

                    )}
                </fieldset>


                <fieldset className="payment__method payment__method--dev">
                    <label className="payment__method-label payment__method-label--close">
                        <input
                            className="payment__method-radio"
                            type="radio"
                            name="paymentMethod"
                            value="paypal"
                            checked={formik.values.paymentMethod === "paypal"}
                            onChange={formik.handleChange}
                        />
                        PayPal
                    </label>

                    <label className="payment__method-label payment__method-label--close">
                        <input
                            className="payment__method-radio"
                            type="radio"
                            name="paymentMethod"
                            value="bitcoin"
                            checked={formik.values.paymentMethod === "bitcoin"}
                            onChange={formik.handleChange}
                        />
                        Bitcoin
                    </label>
                </fieldset>

                <div className="payment__notice">
                    <div className="payment__notice-security">
                        {security}
                        <span className="payment__notice-security-label">All your data are safe</span>
                    </div>
                    <p className="payment__notice-text">Discounts, offers and price concessions will be applied later
                        during payment</p>
                </div>


                <button
                    className="payment-form__btn"
                    type="submit"
                    disabled={formik.values.paymentMethod === "paypal" || formik.values.paymentMethod === "bitcoin"}
                >
                    {formik.values.paymentMethod === "paypal" || formik.values.paymentMethod === "bitcoin" ? "Находится в разработке" : "Оплатить"}
                </button>


                {/* показ ошибок */}
                <div className="payment-form__errors">
                    {formik.values.paymentMethod === "creditCard" && (
                        <div className="error-message">
                            {formik.errors.cardNumber || formik.errors.expirationDate || formik.errors.cvc}
                        </div>
                    )}
                </div>


            </form>
        </div>
    )
}

export default PaymentMethod;