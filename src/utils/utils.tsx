//функция преобразования числа в читаемый вид (3000000 --> 3 000 000)
export const transformView = (value: number) => {
	return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

export const calculateMonthlyPayment = (
	costValue: number,
	feeValue: number,
	leasingValue: number,
	interestRate: number = 0.035
) => {
	return (
		((costValue - (feeValue * costValue) / 100) *
			(interestRate * Math.pow(1 + interestRate, leasingValue))) /
		Math.pow(1 + interestRate, leasingValue - 1)
	);
};

export const calculateDealAmount = (
	costValue: number,
	feeValue: number,
	leasingValue: number,
	monthlyPaymentValue: number
) => {
	return (feeValue * costValue) / 100 + leasingValue * monthlyPaymentValue;
};
