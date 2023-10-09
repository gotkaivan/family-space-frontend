import { PaginationRequestDto, TransactionFiltersRequestDto, TransactionRequestOptionsDto } from 'generated/api';
import InvestmentFilters from './InvestmentFilters';
import PaginationRequest from 'common/entities/PaginationRequest';

class InvestmentOptions implements TransactionRequestOptionsDto {
	constructor(options?: TransactionRequestOptionsDto) {
		this.filters = options?.filters || new InvestmentFilters();
		this.pagination = options?.pagination || new PaginationRequest();
	}

	filters?: TransactionFiltersRequestDto;

	pagination?: PaginationRequestDto;
}

export default InvestmentOptions;
