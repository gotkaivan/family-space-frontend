import { useMemo, useState } from 'react';
import { CreateTransactionResponseDto, GetTransactionsResponseDto, TransactionDto, UpdateSaleTransactionResponseDto, UpdateTransactionResponseDto } from 'generated/api';
import { createTransactionApi, deleteSaleTransactionApi, deleteTransactionApi, getTransactionsApi, updateSaleTransactionApi, updateTransactionApi } from '../api';
import { NOTIFY_TYPES, useNotify } from 'common/hooks/useNotify';
import TransactionOptions from '../entities/TransactionOptions';

const useTransaction = () => {
	const { notify } = useNotify();

	const [isLoadingData, setIsLoadingData] = useState<boolean>(false);

	const [isPageLoaded, setIsPageLoaded] = useState<boolean>(false);

	const [transactions, setTransactions] = useState<TransactionDto[]>([]);

	const isLoading = useMemo(() => {
		if (!isPageLoaded && isLoadingData) return true;
		return false;
	}, [isLoadingData, isPageLoaded]);

	async function getTransactions(options?: TransactionOptions): Promise<GetTransactionsResponseDto | undefined> {
		setIsLoadingData(true);

		try {
			const response = await getTransactionsApi(options);
			setTransactions(response.items);
			setIsPageLoaded(true);
			return response;
		} catch (e) {
			notify(NOTIFY_TYPES.ERROR, 'Не удалось получить транзакции');
		} finally {
			setIsLoadingData(false);
		}
	}

	async function createTransaction(transaction: TransactionDto): Promise<CreateTransactionResponseDto> {
		try {
			const { id, ...request } = transaction;
			return await createTransactionApi(request);
		} catch (e) {
			throw 'Не удалось создать новую транзакцию';
		}
	}

	const updateTransaction = async (transaction: TransactionDto): Promise<UpdateTransactionResponseDto> => {
		try {
			return await updateTransactionApi(transaction);
		} catch (e) {
			throw 'Не удалось обновить транзакцию';
		}
	};

	async function updateSaleTransaction(transaction: TransactionDto): Promise<UpdateSaleTransactionResponseDto> {
		try {
			return await updateSaleTransactionApi(transaction);
		} catch (e) {
			throw 'Не удалось обновить транзакцию';
		}
	}

	const deleteTransaction = async (id: number) => {
		try {
			return await deleteTransactionApi(id);
		} catch (e) {
			throw 'Не удалось удалить транзакцию';
		}
	};

	const deleteSaleTransaction = async (id: number) => {
		try {
			return await deleteSaleTransactionApi(id);
		} catch (e) {
			throw 'Не удалось удалить транзакцию';
		}
	};

	return {
		transactions,
		isLoading,
		createTransaction,
		updateTransaction,
		updateSaleTransaction,
		deleteTransaction,
		getTransactions,
		deleteSaleTransaction,
	};
};

export default useTransaction;
