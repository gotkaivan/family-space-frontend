import {
	CancelablePromise,
	TransactionDto,
	TransactionsService,
	DeleteTransactionResponseDto,
	UpdateTransactionResponseDto,
	CreateTransactionDto,
	CreateTransactionResponseDto,
	TransactionFiltersRequestDto,
	GetTransactionsResponseDto,
	UpdateSaleTransactionResponseDto,
} from 'api';
import TransactionFilterOption from '../entities/TransactionFilters';
import TransactionOptions from '../entities/TransactionOptions';

export const getTransactionsApi = (options?: TransactionOptions): CancelablePromise<GetTransactionsResponseDto> => {
	return TransactionsService.transactionControllerGetTransactions(new TransactionOptions(options));
};

export const getTransactionByIdApi = (id: number): CancelablePromise<TransactionDto> => {
	return TransactionsService.transactionControllerGetTransactionById(id);
};

export const createTransactionApi = (transaction: CreateTransactionDto): CancelablePromise<CreateTransactionResponseDto> => {
	return TransactionsService.transactionControllerCreateTransaction(transaction);
};

export const updateTransactionApi = (transaction: TransactionDto): CancelablePromise<UpdateTransactionResponseDto> => {
	return TransactionsService.transactionControllerUpdateTransaction(transaction);
};

export const updateSaleTransactionApi = (transaction: TransactionDto): CancelablePromise<UpdateSaleTransactionResponseDto> => {
	return TransactionsService.transactionControllerUpdateSaleTransaction(transaction);
};

export const deleteTransactionApi = (id: number): CancelablePromise<DeleteTransactionResponseDto> => {
	return TransactionsService.transactionControllerDeleteTransaction(id);
};

export const deleteSaleTransactionApi = (id: number): CancelablePromise<DeleteTransactionResponseDto> => {
	return TransactionsService.transactionControllerDeleteSaleTransaction(id);
};
