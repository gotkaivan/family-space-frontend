import {
	CancelablePromise,
	TransactionDto,
	TransactionsService,
	DeleteTransactionResponseDto,
	UpdateTransactionResponseDto,
	CreateTransactionDto,
	CreateTransactionResponseDto,
} from 'api';

export const getTransactionsApi = (): CancelablePromise<TransactionDto[]> => {
	return TransactionsService.transactionControllerGetTransactions();
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

export const deleteTransactionApi = (id: number): CancelablePromise<DeleteTransactionResponseDto> => {
	return TransactionsService.transactionControllerDeleteTransaction(id);
};
