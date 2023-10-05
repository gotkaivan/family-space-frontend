import { DEFAULT_LIMIT } from 'common/constants';
import { PaginationRequestDto } from 'generated/api';

class TransactionPagination implements PaginationRequestDto {
	constructor(pagination?: PaginationRequestDto) {
		this.limit = pagination?.limit || DEFAULT_LIMIT;
		this.page = pagination?.page || 1;
	}

	limit: number;

	page: number;
}

export default TransactionPagination;
