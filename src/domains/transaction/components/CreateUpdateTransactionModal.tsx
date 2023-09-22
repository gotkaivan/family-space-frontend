import { FC, useMemo, useState } from 'react';
import Input from 'common/components/ui/Input';
import Icon from 'common/components/ui/Icon';
import Button from 'common/components/ui/Button';
import { CURRENCY_TYPE, ITransaction, TRANSACTION_TYPES } from '../types';
import Transaction from '../entities/Transaction';
import Select from 'common/components/ui/Select';
import { getRandomId } from 'common/helpers';
import Datepicker from 'common/components/ui/BaseDatepicker';

interface IProps {
	id?: number | undefined;
	onCreateUpdateTask: (type: 'create' | 'update', transaction: ITransaction) => void;
	close: () => void;
	data?: ITransaction | null;
}

const curencyTypes = Object.keys(CURRENCY_TYPE).map(item => {
	return {
		id: getRandomId(),
		title: item,
		value: item,
	};
});

const TITLE_ERROR = 'Введите название транзакции';
const VALUE_ERROR = 'Введите сумму транзакции';
const AMOUNT_ERROR = 'Введите количество значения транзакции';

const transactionsTypeLocales = {
	[TRANSACTION_TYPES.INCOME__TRANSACTION__TYPE]: 'Доходы',
	[TRANSACTION_TYPES.EXPENSES__TRANSACTION__TYPE]: 'Расходы',
	[TRANSACTION_TYPES.INVESTMENT__TRANSACTION__TYPE]: 'Покупка инвестиции',
	[TRANSACTION_TYPES.SALE__TRANSACTION__TYPE]: 'Продажа инвестиции',
};

const transactionEditTypes = Object.values(TRANSACTION_TYPES).map(item => {
	return {
		id: getRandomId(),
		title: transactionsTypeLocales[item],
		value: item,
	};
});

const transactionCreateTypes = Object.values(TRANSACTION_TYPES)
	.filter(item => item === TRANSACTION_TYPES.INCOME__TRANSACTION__TYPE || item === TRANSACTION_TYPES.EXPENSES__TRANSACTION__TYPE)
	.map(item => {
		return {
			id: getRandomId(),
			title: transactionsTypeLocales[item],
			value: item,
		};
	});

const CreateUpdateTransactionModal: FC<IProps> = ({ onCreateUpdateTask, close, data, id }) => {
	const [state, setState] = useState<ITransaction>(data || new Transaction());
	const [isTouched, setIsTouched] = useState<boolean>(false);

	const hasTitleError = useMemo(() => !state.title.length, [state.title.length]);

	const hasValueError = useMemo(() => !state.value, [state.value]);

	const hasAmountError = useMemo(() => !state.amount && id, [state.amount, id]);

	const hasTouchedTitleError: boolean = useMemo(() => hasTitleError && isTouched, [hasTitleError, isTouched]);

	const hasTouchedValueError: boolean = useMemo(() => hasValueError && isTouched, [hasValueError, isTouched]);

	const hasTouchedAmountError: boolean = useMemo(() => !!hasAmountError && isTouched, [hasAmountError, isTouched]);

	const isDisabledAmount = useMemo(() => {
		return !id || state.transactionType === TRANSACTION_TYPES.INCOME__TRANSACTION__TYPE || state.transactionType === TRANSACTION_TYPES.EXPENSES__TRANSACTION__TYPE;
	}, [state.transactionType, id]);

	const [currentyTypes] = useState(curencyTypes);

	const buttonTitle = useMemo(() => (id ? 'Update task' : 'Create task'), [id]);

	const validateForm = () => {
		if (hasTitleError || hasValueError || hasAmountError) return false;
		return true;
	};

	const onClickHandler = async () => {
		setIsTouched(true);
		if (validateForm()) {
			const requestType = id ? 'update' : 'create';
			await onCreateUpdateTask(requestType, state);
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
					hasError={hasTouchedTitleError}
					errorMessage={TITLE_ERROR}
					value={state.title}
					onChange={e => setState({ ...state, title: e.target.value })}
					type="text"
					className="mb-8"
					withError={hasTouchedTitleError}
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
				{id && (
					<Input
						label="Количество"
						placeholder="Введите количество"
						disabled={isDisabledAmount}
						hasError={!!hasTouchedAmountError}
						errorMessage={AMOUNT_ERROR}
						value={state.amount}
						onChange={e => setState({ ...state, amount: +e.target.value })}
						type="number"
						className="mb-8"
						withError={!!hasTouchedAmountError}
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
				<Select
					label="Тип транзакции"
					disabled={!!id}
					value={state.transactionType}
					onChange={e => setState({ ...state, transactionType: (e.target as any).value })}
					className="mb-8"
					withError={false}
					options={id ? transactionEditTypes : transactionCreateTypes}
				/>
				<Datepicker
					label="Дата создания транзакции"
					value={state.transactionDate}
					onChange={function (value: string | null): void {
						setState({ ...state, transactionDate: value });
					}}
				/>
				<div className="flex justify-end">
					<Button
						className="text-white font-medium py-2.5 px-4.5 rounded-md"
						title={buttonTitle}
						clickHandler={() => onClickHandler()}
					/>
				</div>
			</div>
		</div>
	);
};

export default CreateUpdateTransactionModal;
