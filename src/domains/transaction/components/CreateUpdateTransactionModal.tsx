import { FC, useMemo, useState } from 'react';
import Input from 'common/components/ui/Input';
import Button from 'common/components/ui/Button';
import Transaction from '../entities/Transaction';
import Select from 'common/components/ui/Select';
import { getRandomId } from 'common/helpers';
import Datepicker from 'common/components/ui/BaseDatepicker';
import Icon from 'common/components/ui/LucideIcon';
import { TransactionDto } from 'generated/api';
import Textarea from 'common/components/ui/Textarea';
import Checkbox from 'common/components/ui/Ckeckbox';

interface IProps {
	id?: number | undefined;
	onCreateUpdateTask: (type: 'create' | 'update', transaction: TransactionDto) => void;
	close: () => void;
	data?: TransactionDto | null;
}

const curencyTypes = Object.keys(TransactionDto.currencyType).map(item => {
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
	[TransactionDto.transactionType.INCOME]: 'Доходы',
	[TransactionDto.transactionType.EXPENSES]: 'Расходы',
	[TransactionDto.transactionType.INVESTMENT]: 'Покупка инвестиции',
	[TransactionDto.transactionType.SALE]: 'Продажа инвестиции',
};

const transactionEditTypes = Object.values(TransactionDto.transactionType).map(item => {
	return {
		id: getRandomId(),
		title: transactionsTypeLocales[item],
		value: item,
	};
});

const transactionCreateTypes = Object.values(TransactionDto.transactionType).map(item => {
	return {
		id: getRandomId(),
		title: transactionsTypeLocales[item],
		value: item,
	};
});

const CreateUpdateTransactionModal: FC<IProps> = ({ onCreateUpdateTask, close, data, id }) => {
	const [state, setState] = useState<TransactionDto>(data || new Transaction());

	const [isTouched, setIsTouched] = useState<boolean>(false);

	const [isOwe, setIsOwe] = useState<boolean>(false);

	const hasTitleError = useMemo(() => !state.title.length, [state.title.length]);

	const hasCurrentProceError = useMemo(() => !state.currentPrice, [state.currentPrice]);

	const hasAmountError = useMemo(() => !state.amount && id, [state.amount, id]);

	const hasTouchedTitleError: boolean = useMemo(() => hasTitleError && isTouched, [hasTitleError, isTouched]);

	const hasTouchedCurrentPriceError: boolean = useMemo(() => hasCurrentProceError && isTouched, [hasCurrentProceError, isTouched]);

	const hasTouchedAmountError: boolean = useMemo(() => !!hasAmountError && isTouched, [hasAmountError, isTouched]);

	const isVisibleAmount = useMemo(() => {
		return state.transactionType === TransactionDto.transactionType.INVESTMENT || state.transactionType === TransactionDto.transactionType.SALE;
	}, [state.transactionType]);

	const [currentyTypes] = useState(curencyTypes);

	const buttonTitle = useMemo(() => (id ? 'Обновить транзакцию' : 'Создать транзакцию'), [id]);

	const validateForm = () => {
		if (hasTitleError || hasTouchedCurrentPriceError || hasAmountError) return false;
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
						name={'x'}
						size={20}
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
				<Textarea
					label="Описание транзакции"
					placeholder="Введите описание транзакции"
					value={state.description}
					onChange={e => setState({ ...state, description: e.target.value })}
				/>
				<Input
					label="Стоимость покупки единицы"
					placeholder="Введите сумму"
					hasError={hasTouchedCurrentPriceError}
					errorMessage={VALUE_ERROR}
					value={state.purchasePrice || ''}
					onChange={e => setState({ ...state, purchasePrice: +e.target.value })}
					type="number"
					className="mb-8"
					withError={hasTouchedCurrentPriceError}
				/>
				<Input
					label="Текущая стоимость единицы"
					placeholder="Введите сумму"
					hasError={hasTouchedCurrentPriceError}
					errorMessage={VALUE_ERROR}
					value={state.currentPrice || ''}
					onChange={e => setState({ ...state, currentPrice: +e.target.value })}
					type="number"
					className="mb-8"
					withError={hasTouchedCurrentPriceError}
				/>
				{isVisibleAmount && (
					<Input
						label="Количество"
						placeholder="Введите количество"
						hasError={!!hasTouchedAmountError}
						errorMessage={AMOUNT_ERROR}
						value={state.amount}
						onChange={e => setState({ ...state, amount: +e.target.value })}
						type="number"
						className="mb-8"
						withError={!!hasTouchedAmountError}
					/>
				)}
				<Checkbox
					text="Долг по транзакции"
					id={'oweCheckbox'}
					className="mb-8"
					value={isOwe}
					onChange={() => setIsOwe(!isOwe)}
				/>
				{isOwe && (
					<Input
						label="Долг по текущей транзакции"
						placeholder="Введите сумму"
						hasError={hasTouchedCurrentPriceError}
						errorMessage={VALUE_ERROR}
						value={state.owesPrice || ''}
						onChange={e => setState({ ...state, owesPrice: +e.target.value })}
						type="number"
						className="mb-8"
						withError={hasTouchedCurrentPriceError}
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
