import { TransactionFiltersDateDto, TransactionFiltersRequestDto } from 'generated/api';

class TransactionFilters implements TransactionFiltersRequestDto {
	constructor(filters?: TransactionFiltersRequestDto) {
		this.search = filters?.search;
		this.currencyType = filters?.currencyType;
		this.transactionType = filters?.transactionType;
		this.transactionDate = filters?.transactionDate;
	}

	search?: string | undefined;

	currencyType?: TransactionFiltersRequestDto.currencyType | undefined;

	transactionType?: TransactionFiltersRequestDto.transactionType | undefined;

	transactionDate?: TransactionFiltersDateDto | undefined;
}

export default TransactionFilters;
