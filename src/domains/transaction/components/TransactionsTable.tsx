import { FC, useMemo } from 'react';
import columns from '../config/transactionTableOptions';
import { IActionTransactionResponseParams, ITransaction, TRANSACTION_TYPES } from '../types';
import { formatDate } from 'common/helpers/formatDate';
import Icon from 'common/components/ui/LucideIcon';

interface IProps {
	data: ITransaction[];
	hasActions?: boolean;
	setActionData: (data: IActionTransactionResponseParams) => void;
}

const TransactionTable: FC<IProps> = ({ hasActions = false, setActionData, data }) => {
	const headerColumn = useMemo(() => {
		return columns.map(column => {
			return (
				<th
					key={column.id}
					className="py-4 px-4 text-sm font-medium text-black dark:text-white"
				>
					{column.title}
				</th>
			);
		});
	}, []);

	const actionColumn = useMemo(() => {
		if (hasActions) return <th className="py-4 px-4 font-medium text-black dark:text-white"></th>;
	}, [hasActions]);

	const getTransactionTypeItem = (type: TRANSACTION_TYPES) => {
		if (type === TRANSACTION_TYPES.INCOME__TRANSACTION__TYPE) {
			return <div className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">Income</div>;
		}

		if (type === TRANSACTION_TYPES.EXPENSES__TRANSACTION__TYPE) {
			return <p className="inline-flex rounded-full bg-meta-1 bg-opacity-10 py-1 px-3 text-sm font-medium text-meta-1">Expenses</p>;
		}

		if (type === TRANSACTION_TYPES.INVESTMENT__TRANSACTION__TYPE) {
			return <p className="inline-flex rounded-full bg-meta-5 bg-opacity-10 py-1 px-3 text-sm font-medium text-meta-5">Investment</p>;
		}

		if (type === TRANSACTION_TYPES.SALE__TRANSACTION__TYPE) {
			return <p className="inline-flex rounded-full bg-meta-8 bg-opacity-10 py-1 px-3 text-sm font-medium text-meta-8">Sales</p>;
		}
	};

	const openEdit = (data: ITransaction) => {
		setActionData({
			id: data.id,
			typeAction: 'edit',
			data,
		});
	};

	const openDelete = (data: ITransaction) => {
		setActionData({
			id: data.id,
			typeAction: 'delete',
		});
	};

	const tableData = useMemo(() => {
		return data.map(item => {
			return (
				<tr key={item.id}>
					<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
						<div className="font-medium text-black dark:text-white text-sm">{item.title}</div>
					</td>
					<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
						<div className="font-medium text-black dark:text-white text-sm">{item.value}</div>
					</td>
					<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
						<div className="font-medium text-black dark:text-white text-sm">{item.amount}</div>
					</td>
					<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
						<div className="font-medium text-black dark:text-white text-sm">{item.currencyType}</div>
					</td>
					<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">{getTransactionTypeItem(item.transactionType)}</td>
					<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
						{item.transactionDate && <div className="font-medium text-black dark:text-white text-sm">{formatDate(item.transactionDate)}</div>}
					</td>
					<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
						<div className="flex items-center space-x-3.5">
							<button
								onClick={() => openEdit(item)}
								className="hover:text-primary"
							>
								<Icon
									name="pencil"
									size={18}
								/>
							</button>
							<button
								onClick={() => openDelete(item)}
								className="hover:text-primary"
							>
								<Icon
									name={'trash'}
									size={18}
								/>
							</button>
						</div>
					</td>
				</tr>
			);
		});
	}, [data, openDelete, openEdit]);

	return (
		<div className="rounded-md border border-stroke bg-white px-5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
			<div className="max-w-full overflow-x-auto">
				{!data.length && <div className="flex justify-center text-sm">Транзакций пока нет</div>}
				{!!data.length && (
					<table className="w-full table-auto">
						<thead>
							<tr className="bg-gray-2 text-left dark:bg-meta-4">
								{headerColumn}
								{actionColumn}
							</tr>
						</thead>

						<tbody>{tableData}</tbody>
					</table>
				)}
			</div>
		</div>
	);
};

export default TransactionTable;
