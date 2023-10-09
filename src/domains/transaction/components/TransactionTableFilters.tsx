import { Dispatch, FC, SetStateAction } from 'react';
import Input from '../../../common/components/ui/Input';
import Select from '../../../common/components/ui/Select';
import { currencyTypes, transactionTypes } from '../helpers';
import { useForm } from 'react-hook-form';
import { TransactionFiltersRequestDto } from 'generated/api';
import Datepicker from 'common/components/ui/Datepicker';
import TransactionFilterOption from '../entities/TransactionFilters';
import { useDebounce } from 'common/hooks/useDebounce';
import { FILTERS_DELAY } from 'common/constants';

interface IProps {
	filters: TransactionFiltersRequestDto;
	setFilters: Dispatch<SetStateAction<TransactionFiltersRequestDto>>;
}

const TransactionTableFilters: FC<IProps> = ({ filters, setFilters }) => {
	const debounceChangeFilters = useDebounce(setFilters, FILTERS_DELAY);

	const { watch, register, setValue } = useForm<TransactionFiltersRequestDto>({
		defaultValues: {
			...filters,
		},
	});

	watch(data => {
		debounceChangeFilters(new TransactionFilterOption(formatFilters(data)));
	});

	function formatFilters(data: any): TransactionFiltersRequestDto {
		return {
			...data,
			transactionDate: {
				startDate: data.transactionDate?.startDate ?? '',
				endDate: data.transactionDate?.endDate ?? '',
			},
		};
	}

	return (
		<div className="flex gap-6 items-center justify-between">
			<div className="w-80">
				<Input
					id={'search'}
					register={register('search')}
					placeholder="Поиск по имени транзакции"
					withError={false}
					className="w-full"
				/>
			</div>

			<div className="flex gap-6 items-center">
				<Select
					id="currencyType"
					value={watch('currencyType')}
					defaultValue="Все валюты"
					register={register('currencyType')}
					className="w-50"
					options={currencyTypes}
				/>
				<Select
					id="transactionType"
					value={watch('transactionType')}
					defaultValue="Все типы транзакций"
					register={register('transactionType')}
					className="w-50"
					options={transactionTypes}
				/>
				<Datepicker
					className="w-60"
					withError={false}
					withDefaultValue={false}
					asSingle={false}
					placeholder="Все даты"
					id={'transactionDate'}
					setValue={setValue}
				/>
			</div>
		</div>
	);
};

export default TransactionTableFilters;
