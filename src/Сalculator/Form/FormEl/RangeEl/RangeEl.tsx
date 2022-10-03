import s from "./RangeEl.module.css";
import f from "../FormEl.module.css";

type PropsType = {
	type: string;
	initialValue: number;
	min: number;
	max: number;
	step: number;
	isLoading: boolean;
	setProgress: (e: any) => void;
};
export const RangeEl: React.FC<PropsType> = ({
	type,
	setProgress,
	initialValue,
	min,
	max,
	step,
	isLoading,
}) => {
	return (
		<input
			className={`${
				type === "cost" ? s.range_cost : type === "fee" ? s.range_fee : s.range_leasing
			} ${f.range}`}
			type="range"
			onInput={setProgress}
			defaultValue={initialValue}
			min={min}
			max={max}
			step={step}
			disabled={isLoading}
		/>
	);
};
