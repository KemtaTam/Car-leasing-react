import { Form } from "./Form/Form";
import s from "./Сalculator.module.css";

export const Сalculator = () => {

	return (
		<div className={s.calculator}>
			<div className={s.wrapper}>
				<h1 className={s.title}>Рассчитайте стоимость автомобиля в лизинг</h1>
				<Form />
			</div>
		</div>
	);
};
