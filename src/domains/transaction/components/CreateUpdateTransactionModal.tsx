import { FC, useEffect, useMemo, useState } from 'react';
import Input from 'common/components/ui/Input';
import Button from 'common/components/ui/Button';
import Select from 'common/components/ui/Select';
import Datepicker from 'common/components/ui/Datepicker';
import Icon from 'common/components/ui/Icon';
import { TransactionDto } from 'generated/api';
import Textarea from 'common/components/ui/Textarea';
import Checkbox from 'common/components/ui/Ckeckbox';
import { SubmitHandler, useForm } from 'react-hook-form';
import Transaction from '../entities/Transaction';
import { transactionTypes, currencyTypes, transactionTypesForCreate } from '../helpers';
import FormModal from 'common/components/modals/FormModal';

interface IProps {
	id?: number | undefined;
	onCreateUpdateTask: (type: 'create' | 'update', transaction: TransactionDto) => void;
	close: () => void;
	data?: TransactionDto | null;
}

const CreateUpdateTransactionModal: FC<IProps> = ({ onCreateUpdateTask, close, data, id }) => {
	const [isOwe, setIsOwe] = useState<boolean>(false);
	const [isExistBefore, setIsExistBefore] = useState<boolean>(false);

	const {
		register,
		handleSubmit,
		setValue,
		reset,
		watch,
		formState: { errors },
	} = useForm<TransactionDto>({
		defaultValues: {
			...data,
		},
	});

	const { transactionType } = watch();

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const isSale = useMemo(() => {
		return transactionType === TransactionDto.transactionType.SALE;
	}, [transactionType]);

	const isInvestment = useMemo(() => {
		return transactionType === TransactionDto.transactionType.INVESTMENT;
	}, [transactionType]);

	const isInvestmentOrSale = useMemo(() => {
		return isInvestment || isSale;
	}, [isInvestment, isSale]);

	const priceTitle = useMemo(() => {
		return isInvestmentOrSale ? 'Cтоимость продажи единицы' : 'Сумма';
	}, [isInvestmentOrSale]);

	const buttonTitle = useMemo(() => (id ? 'Обновить транзакцию' : 'Создать транзакцию'), [id]);

	const onClickHandler: SubmitHandler<TransactionDto> = async (form: TransactionDto) => {
		const requestType = id ? 'update' : 'create';
		setIsLoading(true);
		try {
			await onCreateUpdateTask(
				requestType,
				new Transaction({
					...form,
					isExistBefore,
				})
			);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		reset();
	}, [data]);

	useEffect(() => {
		setIsOwe(!!data?.owesPrice);
	}, [data?.owesPrice]);

	useEffect(() => {
		setIsExistBefore(!!data?.isExistBefore);
	}, [data?.isExistBefore]);

	return (
		<FormModal
			close={close}
			content={
				<form onSubmit={handleSubmit(onClickHandler)}>
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
						id="title"
						label="Название транзакции"
						placeholder="Введите название транзакции"
						register={register('title', {
							required: 'Поле должно быть заполнено',
						})}
						hasError={!!errors.title?.message}
						errorMessage={errors.title?.message}
						type="text"
						className="mb-8"
						withError={!!errors.title?.message}
					/>
					<Textarea
						id="description"
						label="Описание транзакции"
						rows={3}
						placeholder="Введите описание транзакции"
						register={register('description')}
					/>
					<div className="flex gap-6">
						<Select
							id="transactionType"
							value={watch('transactionType')}
							label="Тип транзакции"
							register={register('transactionType')}
							disabled={!!id}
							className="mb-8 w-full"
							options={id ? transactionTypes : transactionTypesForCreate}
						/>
						<Select
							id="currencyType"
							value={watch('currencyType')}
							label="Тип валюты"
							register={register('currencyType')}
							className="mb-8 w-full"
							options={currencyTypes}
						/>
					</div>
					<div className="flex gap-6">
						{isInvestment && (
							<Input
								id="purchasePrice"
								register={register('purchasePrice', {
									valueAsNumber: true,
									required: true,
									validate: (val: number) => {
										if (!+val) {
											return 'Поле должно быть заполнено';
										}
									},
								})}
								label="Стоимость покупки единицы"
								placeholder="Введите сумму"
								type="number"
								className="mb-8"
								withError={!!errors.purchasePrice?.message}
								hasError={!!errors.purchasePrice?.message}
								errorMessage={errors.purchasePrice?.message}
							/>
						)}
						{isSale && (
							<Input
								id="currentPrice"
								label={priceTitle}
								placeholder="Введите сумму"
								register={register('currentPrice', {
									valueAsNumber: true,
									required: true,
									validate: (val: number) => {
										if (!+val) {
											return 'Поле должно быть заполнено';
										}
									},
								})}
								hasError={!!errors.currentPrice?.message}
								errorMessage={errors.currentPrice?.message}
								type="number"
								className="mb-8"
								withError={!!errors.currentPrice?.message}
							/>
						)}
					</div>

					{isInvestment && (
						<Checkbox
							text="Долг по транзакции"
							id={'oweCheckbox'}
							className="mb-8"
							value={isOwe}
							onChange={() => setIsOwe(!isOwe)}
						/>
					)}

					<div className="flex gap-6">
						{isOwe && isInvestment && (
							<Input
								id="owesPrice"
								label="Долг по текущей транзакции"
								placeholder="Введите сумму"
								register={register('owesPrice', {
									valueAsNumber: true,
									required: true,
									validate: (val: number | undefined) => {
										if (val && !+val) {
											return 'Поле должно быть заполнено';
										}
									},
								})}
								hasError={!!errors.owesPrice?.message}
								errorMessage={errors.owesPrice?.message}
								type="number"
								className="mb-8"
								withError={!!errors.owesPrice?.message}
							/>
						)}
						{
							<Input
								id={isSale ? 'currentAmount' : 'purchaseAmount'}
								label="Количество"
								register={register(isSale ? 'currentAmount' : 'purchaseAmount', {
									valueAsNumber: true,
									required: true,
									validate: (val: number) => {
										if (!+val) {
											return 'Поле должно быть заполнено';
										}
									},
								})}
								placeholder="Введите количество"
								hasError={!!errors[isSale ? 'currentAmount' : 'purchaseAmount']?.message}
								errorMessage={errors[isSale ? 'currentAmount' : 'purchaseAmount']?.message}
								type="number"
								className="mb-8"
								withError={!!errors[isSale ? 'currentAmount' : 'purchaseAmount']?.message}
							/>
						}
					</div>
					{isInvestment && (
						<Checkbox
							text="Инвестиция создана до вычислений"
							id={'isExistBefore'}
							className="mb-8"
							value={isExistBefore}
							onChange={() => setIsExistBefore(!isExistBefore)}
						/>
					)}

					<Datepicker
						id="transactionDate"
						label="Дата создания транзакции"
						value={watch('transactionDate')}
						setValue={setValue}
					/>
					<div className="flex justify-end">
						<Button
							isLoading={isLoading}
							type="submit"
							className="text-white font-medium py-2.5 px-4.5 rounded-md"
							title={buttonTitle}
						/>
					</div>
				</form>
			}
		/>
	);
};

export default CreateUpdateTransactionModal;
