import { PaginationRequestDto, TransactionFiltersRequestDto, TransactionRequestOptionsDto } from 'generated/api';
import TransactionFilters from './TransactionFilters';
import TransactionPagination from './TransactionPagination';

class TransactionOptions implements TransactionRequestOptionsDto {
	constructor(options?: TransactionRequestOptionsDto) {
		this.filters = options?.filters || new TransactionFilters();
		this.pagination = options?.pagination || new TransactionPagination();
	}

	filters?: TransactionFiltersRequestDto;

	pagination?: PaginationRequestDto;
}

export default TransactionOptions;
