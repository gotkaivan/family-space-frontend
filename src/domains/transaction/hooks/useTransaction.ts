import { useEffect, useMemo, useState } from 'react';
import { ITransaction } from '../types';
import { TRANSACTION__DATA } from '../constants';

const useTransaction = () => {
	const [transactions, setTransactions] = useState<ITransaction[]>([]);

	async function saveTransactions(data: ITransaction[]) {
		await localStorage.setItem(TRANSACTION__DATA, JSON.stringify(data));
		return setTransactions(data);
		return;
	}

	const createTransaction = async (transaction: ITransaction) => {
		try {
			const result = [...transactions];
			result.push(transaction);
			return await saveTransactions(result);
		} catch (e) {
			throw new Error('Не удалось создать транзакцию');
		}
	};

	const updateTransaction = async (transaction: ITransaction) => {
		try {
			const result = transactions.map(item => {
				if (item.id === transaction.id) {
					return {
						...transaction,
						updated: new Date().toISOString(),
					};
				}
				return item;
			});
			return await saveTransactions(result);
		} catch (e) {
			throw new Error('Не удалось обновить транзакцию');
		}
	};

	const deleteTransaction = async (id: number) => {
		try {
			const result = transactions.filter(transaction => transaction.id !== id);
			return await saveTransactions(result);
		} catch (e) {
			throw new Error('Не удалось удалить транзакцию');
		}
	};

	const getTransactions = () => {
		try {
			const data = localStorage.getItem(TRANSACTION__DATA);
			if (data) setTransactions(JSON.parse(data));
		} catch (e) {
			throw new Error('Не удалось получить транзакции');
		}
	};

	useEffect(() => {
		getTransactions();
	}, []);

	return {
		transactions,
		createTransaction,
		updateTransaction,
		deleteTransaction,
		getTransactions,
	};
};

export default useTransaction;
