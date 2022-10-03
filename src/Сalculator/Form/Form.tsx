import { useState } from "react";
import { useMutation } from "react-query";
import { FormEl } from "./FormEl/FormEl";
import { calculateDealAmount, calculateMonthlyPayment, transformView } from "../../utils/utils";
import { sendLeasingData } from "../../api/api";
import preloader from "../../assets/preloader.svg";
import s from "./Form.module.css";

export const Form = () => {
	const initialCostValue = 3_300_000;
	const initialFeeValue = 13;
	const initialLeasingValue = 60;

	const [costValue, setCostValue] = useState(initialCostValue);
	const [feeValue, setFeeValue] = useState(initialFeeValue);
	const [leasingValue, setLeasingValue] = useState(initialLeasingValue);

	const initialmonthlyPayment = calculateMonthlyPayment(costValue, feeValue, leasingValue);
	const initialDealAmount = calculateDealAmount(
		costValue,
		feeValue,
		leasingValue,
		initialmonthlyPayment
	);

	const [monthlyPaymentValue, setMonthlyPaymentValue] = useState(Math.ceil(initialmonthlyPayment));
	const [dealAmountValue, setDealAmountValue] = useState(Math.ceil(initialDealAmount));

	// для запросов
	const { mutate, isLoading } = useMutation("leasing", (data: string) => sendLeasingData(data), {
		onSuccess: (data) => {
			console.log(data);
		},
		onError: () => {
			console.log("error");
		},
	});

	const sendButtonHandler = () => {
		const data = { costValue, dealAmountValue, feeValue, leasingValue, monthlyPaymentValue };
		mutate(JSON.stringify(data));	//отправить запрос
	};

	return (
		<div className={s.form}>
			<div className={s.form_el_wrapper}>
				<FormEl
					title="Стоимость автомобиля"
					costValue={costValue}
					feeValue={feeValue}
					leasingValue={leasingValue}
					initialValue={initialCostValue}
					monthlyPaymentValue={monthlyPaymentValue}
					setValue={setCostValue}
					setMonthlyPaymentValue={setMonthlyPaymentValue}
					setDealAmountValue={setDealAmountValue}
					max={6_000_000}
					min={1_000_000}
					step={50_000}
					type={"cost"}
					isLoading={isLoading}
				/>
				<FormEl
					title="Первоначальный взнос"
					costValue={costValue}
					feeValue={feeValue}
					leasingValue={leasingValue}
					initialValue={initialFeeValue}
					monthlyPaymentValue={monthlyPaymentValue}
					setValue={setFeeValue}
					setMonthlyPaymentValue={setMonthlyPaymentValue}
					setDealAmountValue={setDealAmountValue}
					max={60}
					min={10}
					step={1}
					type={"fee"}
					isLoading={isLoading}
				/>
				<FormEl
					title="Срок лизинга"
					costValue={costValue}
					feeValue={feeValue}
					leasingValue={leasingValue}
					initialValue={initialLeasingValue}
					monthlyPaymentValue={monthlyPaymentValue}
					setValue={setLeasingValue}
					setMonthlyPaymentValue={setMonthlyPaymentValue}
					setDealAmountValue={setDealAmountValue}
					max={60}
					min={1}
					step={1}
					type={"leasing"}
					isLoading={isLoading}
				/>
			</div>

			<div className={s.calculate_form_el_wrapper}>
				<div className={s.calculate_form_el}>
					<p className={s.calculate_form_el_title}>Сумма договора лизинга</p>
					<h2 className={s.calculate_form_el_value}>
						{transformView(dealAmountValue) + " ₽"}
					</h2>
				</div>
				<div className={s.calculate_form_el}>
					<p className={s.calculate_form_el_title}>Ежемесячный платеж от</p>
					<h2 className={s.calculate_form_el_value}>
						{transformView(monthlyPaymentValue) + " ₽"}
					</h2>
				</div>
				<button
					className={s.bSend}
					type="submit"
					onClick={sendButtonHandler}
					disabled={isLoading}>
					<h3>
						{isLoading ? (
							<img className={s.preloader} src={preloader} alt="preloader" />
						) : (
							"Оставить заявку"
						)}
					</h3>
				</button>
			</div>
		</div>
	);
};
