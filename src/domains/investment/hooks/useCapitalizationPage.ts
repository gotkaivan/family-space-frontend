import { NOTIFY_TYPES, useNotify } from 'common/hooks/useNotify';
import useTransaction from 'domains/transaction/hooks/useTransaction';
import { IActionTransactionResponseParams, TRANSACTION_TYPES } from 'domains/transaction/types';
import { useMemo, useState } from 'react';
import { IInvestment, ISellInvestment } from '../types';

const useCapitalizationPage = () => {
	const { notify } = useNotify();

	const { transactions, getTransactions, deleteTransaction, createTransaction, updateTransaction } = useTransaction();

	const [actionData, setActionData] = useState<IActionTransactionResponseParams | null>(null);

	const investments = useMemo(() => {
		return transactions.filter(transaction => transaction.transactionType === TRANSACTION_TYPES.INVESTMENT__TRANSACTION__TYPE && !!transaction.amount);
	}, [transactions]);

	async function createInvestment(investment: IInvestment) {
		try {
			await createTransaction(investment);
			setActionData(null);
			await getTransactions();
			notify(NOTIFY_TYPES.SUCCESS, 'Инвестиция успешно создана');
		} catch (e) {
			notify(NOTIFY_TYPES.ERROR, 'Не удалось создать инвестицию');
		}
	}

	async function updateInvestment(investment: IInvestment) {
		try {
			await updateTransaction(investment);
			setActionData(null);
			await getTransactions();
			notify(NOTIFY_TYPES.SUCCESS, 'Инвестиция успешно обновлена');
		} catch (e) {
			notify(NOTIFY_TYPES.ERROR, 'Не удалось обновить инвестицию');
		}
	}

	async function sellInvestment(sellItem: ISellInvestment, investment: IInvestment) {
		try {
			const amount = investment.amount > sellItem.sellAmount ? investment.amount - sellItem.sellAmount : 1;

			const { sellAmount, ...other } = sellItem;
			const updateRequest = {
				...investment,
				amount,
			};

			const sellRequest = {
				...other,
				amount: sellItem.sellAmount,
				transactionType: TRANSACTION_TYPES.SALE__TRANSACTION__TYPE,
			};
			await createTransaction(sellRequest);
			await updateTransaction(updateRequest);
			setActionData(null);
			await getTransactions();
			notify(NOTIFY_TYPES.SUCCESS, 'Инвестиция успешно продана');
		} catch (e) {
			notify(NOTIFY_TYPES.ERROR, 'Не удалось продать инвестицию');
		}
	}

	function onActionInvestment(type: 'create' | 'update', investment: IInvestment) {
		try {
			switch (type) {
				case 'create':
					return createInvestment(investment);
				case 'update':
					return updateInvestment(investment);
			}
		} catch (message: any) {
			notify(NOTIFY_TYPES.ERROR, message);
		}
	}

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

	return {
		investments,
		actionData,
		setActionData,
		onActionInvestment,
		deleteInvestment,
		sellInvestment,
	};
};

export default useCapitalizationPage;
