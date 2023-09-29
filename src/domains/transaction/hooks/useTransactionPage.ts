import { NOTIFY_TYPES, useNotify } from 'common/hooks/useNotify';
import { useState } from 'react';
import { IActionTransactionResponseParams } from '../types';
import useTransaction from './useTransaction';
import { TransactionDto } from 'generated/api';

const useTransactionPage = () => {
	const { notify } = useNotify();

	const { transactions, createTransaction, updateTransaction, deleteTransaction } = useTransaction();

	const [actionData, setActionData] = useState<IActionTransactionResponseParams | null>(null);

	async function onCreateUpdateTransaction(type: 'create' | 'update', transaction: TransactionDto) {
		try {
			if (type === 'create') {
				await createTransaction(transaction);
				setActionData(null);
				notify(NOTIFY_TYPES.SUCCESS, 'Транзакция успешно создана');
			}

			if (type === 'update') {
				updateTransaction(transaction);
				setActionData(null);
				notify(NOTIFY_TYPES.SUCCESS, 'Транзакция успешно обновлена');
			}
		} catch (message: any) {
			notify(NOTIFY_TYPES.ERROR, message);
		}
	}

	async function onDeleteTransaction(): Promise<boolean> {
		if (actionData?.id && actionData?.typeAction === 'delete') {
			try {
				await deleteTransaction(actionData.id);
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
		transactions,
		setActionData,
		actionData,
		onCreateUpdateTransaction,
		onDeleteTransaction,
	};
};

export default useTransactionPage;
