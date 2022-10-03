import { useEffect, useState } from "react";
import { calculateDealAmount, calculateMonthlyPayment, transformView } from "../../../utils/utils";
import s from "./FormEl.module.css";
import { RangeEl } from "./RangeEl/RangeEl";

type PropsType = {
	title: string;
	costValue: number;
	feeValue: number;
	leasingValue: number;
	initialValue: number;
	min: number;
	max: number;
	step: number;
	type: string;
	monthlyPaymentValue: number;
	isLoading: boolean;
	setValue: (value: number) => void;
	setMonthlyPaymentValue: (value: number) => void;
	setDealAmountValue: (value: number) => void;
};

export const FormEl: React.FC<PropsType> = ({
	title,
	costValue,
	feeValue,
	initialValue,
	min,
	max,
	step,
	type,
	leasingValue,
	monthlyPaymentValue,
	isLoading,
	setValue,
	setMonthlyPaymentValue,
	setDealAmountValue,
}) => {
	const setProgress = (e: any) => {
		const value = `${((e.target.value - min) / (max - min)) * 100}%`;
		setValue(e.target.value);
		setMonthlyPaymentValue(Math.ceil(calculateMonthlyPayment(costValue, feeValue, leasingValue)));
		setDealAmountValue(
			Math.ceil(calculateDealAmount(costValue, feeValue, leasingValue, monthlyPaymentValue))
		);
		//чтобы линия до ползунка имела другой цвет
		e.target.style.setProperty("--progress", value);
	};

	const newFeeValue = (feeValue * costValue) / 100;
	let value = type === "cost" ? costValue : type === "fee" ? newFeeValue : leasingValue;
	const valueType = type === "cost" ? "₽" : type === "fee" ? feeValue : "мес.";

	const [inputValue, setInputValue] = useState(value);

	useEffect(() => {
		setInputValue(value);
		setMonthlyPaymentValue(Math.ceil(calculateMonthlyPayment(costValue, feeValue, leasingValue)));
		setDealAmountValue(
			Math.ceil(calculateDealAmount(costValue, feeValue, leasingValue, monthlyPaymentValue))
		);
	}, [value, costValue, feeValue, leasingValue, monthlyPaymentValue]);

	const onChangeInputValue = (e: any) => {
		if (e.target.value > -1) {
			setInputValue(e.target.value);
			setValue(e.target.value);
		}
	};

	const onSubmitHandler = (e: any) => {
		e.preventDefault();
		modificateInvalidValue(costValue, feeValue, leasingValue);
	};
	const onMouseLeaveHandler = () => {
		modificateInvalidValue(costValue, feeValue, leasingValue);
	};

	const modificateInvalidValue = (costValue: number, feeValue: number, leasingValue: number) => {
		if ((costValue && costValue < 1_000_000) || !costValue) {
			setInputValue(1_000_000);
			setValue(1_000_000);
		} else if (costValue && costValue > 6_000_000) {
			setInputValue(6_000_000);
			setValue(6_000_000);
		}

		if ((feeValue && feeValue < 10) || !feeValue) {
			setInputValue(10);
			setValue(10);
		} else if (feeValue && feeValue > 60) {
			setInputValue(60);
			setValue(60);
		}

		if ((leasingValue && leasingValue < 1) || !leasingValue) {
			setInputValue(1);
			setValue(1);
		} else if (leasingValue && leasingValue > 60) {
			setInputValue(60);
			setValue(60);
		}
	};

	const [isFocus, setIsFocus] = useState(false);

	return (
		<form className={s.form_el} onSubmit={onSubmitHandler} onMouseLeave={onMouseLeaveHandler}>
			<p className={s.form_el_title}>{title}</p>
			<div
				className={`${s.form_el_ellipse} ${isLoading ? s.form_el_ellipse_disabled : null}`}
				onMouseEnter={() => setIsFocus(true)}
				onMouseLeave={() => setIsFocus(false)}>
				<div className={s.value_and_type}>
					<h3 className={s.value}>
						{type !== "fee" ? (
							isFocus ? (		/* Если установлен фокус, то отображать input, иначе просто текст */
								<input
									className={s.input_value}
									type="number"
									value={inputValue}
									onChange={onChangeInputValue}
									name={type}
									disabled={isLoading}
								/>
							) : (
								transformView(value)
							)
						) : (
							transformView(value)
						)}
					</h3>
					<div className={type === "fee" ? s.value_ellipse : undefined}>
						<h3 className={`${type === "fee" ? s.form_el_type : undefined} ${s.form_el_type_size}`}>
							{isFocus && type === "fee" ? (
								<input
									className={s.fee_input_value}
									type="number"
									value={feeValue}
									onChange={onChangeInputValue}
								/>
							) : (
								valueType
							)}
							{type === "fee" && "%"}
						</h3>
					</div>
				</div>
				<RangeEl
					type={type}
					min={min}
					max={max}
					initialValue={initialValue}
					step={step}
					setProgress={setProgress}
					isLoading={isLoading}
				/>
			</div>
		</form>
	);
};
