import { NOTIFY_TYPES, useNotify } from 'common/hooks/useNotify';
import { useEffect, useMemo, useState } from 'react';
import { IActionTransactionResponseParams } from '../types';
import useTransaction from './useTransaction';
import { PaginationRequestDto, TransactionDto, TransactionFiltersRequestDto } from 'generated/api';
import TransactionFilterOption from '../entities/TransactionFilters';
import TransactionOptions from '../entities/TransactionOptions';
import { TRANSACTION_LIMIT } from '../components/constants';

const useTransactionPage = () => {
	const { notify } = useNotify();

	const [filters, setFilters] = useState<TransactionFiltersRequestDto>(new TransactionFilterOption());

	const [total, setTotal] = useState<number | null>(null);

	const [page, setPage] = useState<number>(1);

	const { transactions, createTransaction, updateTransaction, deleteTransaction, getTransactions } = useTransaction();

	const [actionData, setActionData] = useState<IActionTransactionResponseParams | null>(null);

	const pagination: PaginationRequestDto = useMemo(() => {
		return {
			limit: TRANSACTION_LIMIT,
			page,
		};
	}, [page]);

	const pageCount = useMemo(() => {
		if (!total) return 1;
		return Math.round(total / TRANSACTION_LIMIT);
	}, [total]);

	const options: TransactionOptions = useMemo(() => {
		return {
			filters,
			pagination,
		};
	}, [filters, pagination]);

	async function onCreateUpdateTransaction(type: 'create' | 'update', transaction: TransactionDto) {
		try {
			if (type === 'create') {
				await createTransaction(transaction);
				const response = await getTransactions(options);
				if (response?.total) setTotal(response.total);
				setActionData(null);
				notify(NOTIFY_TYPES.SUCCESS, 'Транзакция успешно создана');
			}

			if (type === 'update') {
				await updateTransaction(transaction);
				const response = await getTransactions(options);
				if (response?.total) setTotal(response.total);
				setActionData(null);
				notify(NOTIFY_TYPES.SUCCESS, 'Транзакция успешно обновлена');
			}
		} catch (message: any) {
			notify(NOTIFY_TYPES.ERROR, message);
			setActionData(null);
		}
	}

	async function onDeleteTransaction(): Promise<boolean> {
		if (actionData?.id && actionData?.typeAction === 'delete') {
			try {
				await deleteTransaction(actionData.id);
				const response = await getTransactions(options);
				if (response?.total) setTotal(response.total);
				setActionData(null);
				notify(NOTIFY_TYPES.SUCCESS, 'Транзакция успешно удалена');
				return true;
			} catch (message: any) {
				notify(NOTIFY_TYPES.ERROR, message);
				setActionData(null);
				return false;
			}
		}
		return false;
	}

	useEffect(() => {
		(async () => {
			const response = await getTransactions(options);
			setTotal(response?.total || 0);
		})();
	}, [filters, page]);

	return {
		transactions,
		page,
		filters,
		pagination,
		actionData,
		pageCount,
		setPage,
		setActionData,
		setFilters,
		onCreateUpdateTransaction,
		onDeleteTransaction,
	};
};

export default useTransactionPage;
