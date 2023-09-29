import { ChangeEvent, FC, useEffect, useMemo, useState } from 'react';
import Input from 'common/components/ui/Input';
import Icon from 'common/components/ui/LucideIcon';
import Button from 'common/components/ui/Button';
import Select from 'common/components/ui/Select';
import { getRandomId } from 'common/helpers';
import Datepicker from 'common/components/ui/BaseDatepicker';
import { IInvestment } from '../types';
import Investment from '../entities/Investment';
import Checkbox from 'common/components/ui/Ckeckbox';
import { TransactionDto } from 'generated/api';

interface IProps {
	id?: number | undefined;
	onCreateUpdateInvestment: (type: 'create' | 'update', investment: IInvestment) => void;
	close: () => void;
	data?: IInvestment | null;
}

const curencyTypes = Object.keys(TransactionDto.currencyType).map(item => {
	return {
		id: getRandomId(),
		title: item,
		value: item,
	};
});

const TITLE_ERROR = 'Введите название инвестиции';
const VALUE_ERROR = 'Введите сумму инвестиции';
const AMOUNT_ERROR = 'Введите количество значения инвестиции';

const CreateUpdateInvestmentnModal: FC<IProps> = ({ onCreateUpdateInvestment, close, data, id }) => {
	const [state, setState] = useState<IInvestment>(data || new Investment());

	const [value, setValue] = useState<string | number>('');

	const [amount, setAmount] = useState<string | number>('');

	const [isTouched, setIsTouched] = useState<boolean>(false);

	const hasTitleError = useMemo(() => !state.title.length, [state.title.length]);

	const hasValueError = useMemo(() => !value, [value]);

	const hasAmountError = useMemo(() => !state.amount && id, [state.amount, id]);

	const hasTouchedTitleError: boolean = useMemo(() => hasTitleError && isTouched, [hasTitleError, isTouched]);

	const hasTouchedValueError: boolean = useMemo(() => hasValueError && isTouched, [hasValueError, isTouched]);

	const hasTouchedAmountError: boolean = useMemo(() => !!hasAmountError && isTouched, [hasAmountError, isTouched]);

	useEffect(() => {
		if (data?.amount) setAmount(data.amount);
	}, [data]);

	const isDisabledAmount = useMemo(() => {
		return state.transactionType === TransactionDto.transactionType.INCOME || state.transactionType === TransactionDto.transactionType.EXPENSES;
	}, [state.transactionType]);

	const [currentyTypes] = useState(curencyTypes);

	const buttonTitle = useMemo(() => (id ? 'Обновить инвестицию' : 'Создать инвестицию'), [id]);

	const changeAmount = (e: ChangeEvent<HTMLInputElement>) => {
		setAmount(e.target.value);
	};

	const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	const validateForm = () => {
		if (hasTitleError || hasValueError || hasAmountError) return false;
		return true;
	};

	const onClickHandler = async () => {
		setIsTouched(true);
		if (validateForm()) {
			const requestType = id ? 'update' : 'create';
			const request = {
				...state,
				value: +value || 0,
				amount: +amount || 0,
			};
			await onCreateUpdateInvestment(requestType, request);
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
					label="Название инвестиции"
					placeholder="Введите название инвестиции"
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
					placeholder="Введите сумму инвестиции"
					hasError={hasTouchedValueError}
					errorMessage={VALUE_ERROR}
					value={value}
					onChange={changeValue}
					type="number"
					className="mb-8"
					withError={hasTouchedValueError}
				/>
				<Input
					label="Количество"
					placeholder="Введите количество"
					disabled={isDisabledAmount}
					hasError={!!hasTouchedAmountError}
					errorMessage={AMOUNT_ERROR}
					value={amount}
					onChange={changeAmount}
					type="number"
					className="mb-8"
					withError={!!hasTouchedAmountError}
				/>
				<Select
					label="Тип валюты"
					value={state.currencyType}
					onChange={e => setState({ ...state, currencyType: (e.target as any).value })}
					className="mb-8"
					withError={false}
					options={currentyTypes}
				/>
				<Datepicker
					label="Дата создания инвестиции"
					value={state.transactionDate}
					onChange={function (value: string | null): void {
						setState({ ...state, transactionDate: value });
					}}
				/>
				<Checkbox
					id={'isUncountable'}
					text="Не учавствует в вычислениях"
					className="pl-1"
					value={false}
					onChange={value => null}
				/>
				<div className="flex justify-end pt-4">
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

export default CreateUpdateInvestmentnModal;
