import { InvestmentFiltersRequestDto, TransactionDto, TransactionFiltersDateDto, TransactionFiltersRequestDto } from 'generated/api';

class InvestmentFilters implements InvestmentFiltersRequestDto {
	constructor(filters?: InvestmentFiltersRequestDto) {
		this.search = filters?.search;
		this.currencyType = filters?.currencyType;
		this.transactionDate = filters?.transactionDate;
	}

	search?: string | undefined;

	currencyType?: TransactionFiltersRequestDto.currencyType | undefined;

	transactionDate?: TransactionFiltersDateDto | undefined;
}

export default InvestmentFilters;
