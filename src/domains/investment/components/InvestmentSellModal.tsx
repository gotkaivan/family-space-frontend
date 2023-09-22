import { FC, useMemo, useState } from 'react';
import Input from 'common/components/ui/Input';
import Icon from 'common/components/ui/Icon';
import Button from 'common/components/ui/Button';
import Select from 'common/components/ui/Select';
import { getRandomId } from 'common/helpers';
import { CURRENCY_TYPE, ITransaction, TRANSACTION_TYPES } from 'domains/transaction/types';
import Transaction from 'domains/transaction/entities/Transaction';
import { IInvestment, ISellInvestment } from '../types';
import RangeInput from 'common/components/ui/RangeInput';

interface IProps {
	id?: number | undefined;
	onSellInvestment: (sellInvestment: ISellInvestment, investment: IInvestment) => void;
	close: () => void;
	data: IInvestment;
}

const curencyTypes = Object.keys(CURRENCY_TYPE).map(item => {
	return {
		id: getRandomId(),
		title: item,
		value: item,
	};
});

const VALUE_ERROR = 'Введите сумму транзакции';
const AMOUNT_ERROR = 'Введите количество значения транзакции';

const InvestmentnSellModal: FC<IProps> = ({ onSellInvestment, close, data, id }) => {
	const [state, setState] = useState<ITransaction>(data || new Transaction());

	const [isTouched, setIsTouched] = useState<boolean>(false);

	const [sellAmount, setSellAmount] = useState<number>(1);

	const hasValueError = useMemo(() => !state.value, [state.value]);

	const hasAmountError = useMemo(() => !state.amount && id, [state.amount, id]);

	const hasTouchedValueError: boolean = useMemo(() => hasValueError && isTouched, [hasValueError, isTouched]);

	const hasTouchedAmountError: boolean = useMemo(() => !!hasAmountError && isTouched, [hasAmountError, isTouched]);

	const [currentyTypes] = useState(curencyTypes);

	const validateForm = () => {
		if (hasValueError || hasAmountError) return false;
		return true;
	};

	const onClickHandler = async () => {
		setIsTouched(true);
		if (validateForm()) {
			const request = {
				...state,
				sellAmount,
			};
			await onSellInvestment(request, data);
		}
	};

	return (
		<div
			onClick={() => close()}
			className="fixed top-0 left-0 z-99999 flex h-screen w-full justify-center overflow-y-scroll bg-black/80 py-5 px-4"
		>
			<div
				onClick={e => e.stopPropagation()}
				className="relative m-auto w-full max-w-180 rounded-md border border-stroke bg-gray p-4 shadow-default dark:border-strokedark dark:bg-meta-4 sm:p-8 xl:p-10"
			>
				<button
					onClick={() => close()}
					className="absolute right-1 top-1 sm:right-5 sm:top-5"
				>
					<Icon
						name={'close'}
						width={16}
						height={16}
					/>
				</button>
				<Input
					label="Название транзакции"
					placeholder="Введите название транзакции"
					disabled={true}
					value={state.title}
					onChange={e => setState({ ...state, title: e.target.value })}
					type="text"
					className="mb-8"
					withError={false}
				/>
				<Input
					label="Сумма"
					placeholder="Введите сумму транзакции"
					hasError={hasTouchedValueError}
					errorMessage={VALUE_ERROR}
					value={state.value || ''}
					onChange={e => setState({ ...state, value: +e.target.value })}
					type="number"
					className="mb-8"
					withError={hasTouchedValueError}
				/>
				{state.amount > 1 && (
					<Input
						label="Общее количество"
						placeholder="Введите количество"
						disabled={true}
						hasError={!!hasTouchedAmountError}
						errorMessage={AMOUNT_ERROR}
						value={state.amount}
						onChange={e => setState({ ...state, amount: +e.target.value })}
						type="number"
						className="mb-8"
						withError={!!hasTouchedAmountError}
					/>
				)}
				{state.amount > 1 && (
					<RangeInput
						label="Количество на продажу"
						value={sellAmount}
						disabled={true}
						onChange={e => setSellAmount(+e.target.value)}
						type="number"
						className="mb-8"
						withError={false}
						max={state.amount}
					/>
				)}
				<Select
					label="Тип валюты"
					value={state.currencyType}
					onChange={e => setState({ ...state, currencyType: (e.target as any).value })}
					className="mb-8"
					withError={false}
					options={currentyTypes}
				/>
				<div className="flex justify-end">
					<Button
						className="text-white font-medium py-2.5 px-4.5 rounded-md"
						title="Продать"
						clickHandler={() => onClickHandler()}
					/>
				</div>
			</div>
		</div>
	);
};

export default InvestmentnSellModal;
