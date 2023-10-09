import { NOTIFY_TYPES, useNotify } from 'common/hooks/useNotify';
import useTransaction from 'domains/transaction/hooks/useTransaction';
import { IActionTransactionResponseParams } from 'domains/transaction/types';
import { useEffect, useMemo, useState } from 'react';
import { ISellInvestment } from '../types';
import { InvestmentDto, InvestmentFiltersRequestDto, PaginationRequestDto, SaleInvestmentResponseDto, TransactionDto } from 'generated/api';
import InvestmentFilters from '../entities/InvestmentFilters';
import InvestmentOptions from '../entities/InvestmentOptions';
import { PAGE_LIMIT } from 'common/constants';
import { saleInvestmentApi } from '../api';

const useInvestmentPage = () => {
	const { notify } = useNotify();

	const { transactions, getTransactions, deleteTransaction, createTransaction, updateTransaction } = useTransaction();

	const [filters, setFilters] = useState<InvestmentFiltersRequestDto>(new InvestmentFilters());

	const [total, setTotal] = useState<number | null>(null);

	const [page, setPage] = useState<number>(1);

	const pagination: PaginationRequestDto = useMemo(() => {
		return {
			limit: PAGE_LIMIT,
			page,
		};
	}, [page]);

	const pageCount = useMemo(() => {
		if (!total) return 1;
		const count = Math.round(total / PAGE_LIMIT);
		return !!count ? count : 1;
	}, [total]);

	const options: InvestmentOptions = useMemo(() => {
		return {
			filters,
			pagination,
		};
	}, [filters, pagination]);

	const [actionData, setActionData] = useState<IActionTransactionResponseParams | null>(null);

	const investments = useMemo(() => {
		return transactions.filter(transaction => transaction.transactionType === TransactionDto.transactionType.INVESTMENT && !!transaction.currentAmount);
	}, [transactions]);

	async function onCreateUpdateSaleInvestment(type: 'create' | 'update' | 'sell', investment: TransactionDto): Promise<void> {
		try {
			if (type === 'create') {
				await createTransaction(investment);
				const response = await getTransactions(options);
				if (response?.total) setTotal(response.total);
				setActionData(null);
				notify(NOTIFY_TYPES.SUCCESS, 'Инвестиция успешно создана');
			}
			if (type === 'update') {
				await updateTransaction(investment);
				const response = await getTransactions(options);
				if (response?.total) setTotal(response.total);
				setActionData(null);
				notify(NOTIFY_TYPES.SUCCESS, 'Инвестиция успешно обновлена');
			}

			if (type === 'sell') {
				await sellInvestment(investment);
				const response = await getTransactions(options);
				if (response?.total) setTotal(response.total);
				setActionData(null);
				notify(NOTIFY_TYPES.SUCCESS, 'Инвестиция успешно продана');
			}
		} catch (message: any) {
			notify(NOTIFY_TYPES.ERROR, message);
			setActionData(null);
		}
	}

	const sellInvestment = async (investment: InvestmentDto): Promise<SaleInvestmentResponseDto> => {
		try {
			return await saleInvestmentApi({
				...investment,
				transactionType: TransactionDto.transactionType.SALE,
			});
		} catch (e) {
			throw 'Не удалось продать инвестицию';
		}
	};

	async function deleteInvestment(): Promise<boolean> {
		if (actionData?.id && actionData?.typeAction === 'delete') {
			try {
				await deleteTransaction(actionData.id);
				await getTransactions();
				setActionData(null);
				notify(NOTIFY_TYPES.SUCCESS, 'Транзакция успешно удалена');
				return true;
			} catch (message: any) {
				notify(NOTIFY_TYPES.ERROR, message);
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
		investments,
		actionData,
		page,
		filters,
		pagination,
		pageCount,
		setPage,
		setFilters,
		setActionData,
		onCreateUpdateSaleInvestment,
		deleteInvestment,
	};
};

export default useInvestmentPage;
