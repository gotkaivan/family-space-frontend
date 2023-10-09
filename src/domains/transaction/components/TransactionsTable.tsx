import { FC, useMemo } from 'react';
import columns from '../config/transactionTableOptions';
import { IActionTransactionResponseParams } from '../types';
import { formatDate } from 'common/helpers/formatDate';
import Icon from 'common/components/ui/Icon';
import { TransactionDto } from 'generated/api';

interface IProps {
	data: TransactionDto[];
	hasActions?: boolean;
	setActionData: (data: IActionTransactionResponseParams) => void;
	filters?: JSX.Element;
	pagination?: JSX.Element;
}

const TransactionTable: FC<IProps> = ({ hasActions = false, setActionData, data, filters, pagination }) => {
	const headerColumn = useMemo(() => {
		return columns.map(column => {
			return (
				<th
					key={column.id}
					className="py-4 px-4 text-sm font-medium text-black dark:text-white align-top"
				>
					{column.title}
				</th>
			);
		});
	}, []);

	const actionColumn = useMemo(() => {
		if (hasActions) return <th className="py-4 px-4 font-medium text-black dark:text-white"></th>;
	}, [hasActions]);

	const getTransactionTypeItem = (type: TransactionDto.transactionType) => {
		if (type === TransactionDto.transactionType.INCOME) {
			return <div className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">Доходы</div>;
		}

		if (type === TransactionDto.transactionType.EXPENSES) {
			return <p className="inline-flex rounded-full bg-meta-1 bg-opacity-10 py-1 px-3 text-sm font-medium text-meta-1">Расходы</p>;
		}

		if (type === TransactionDto.transactionType.INVESTMENT) {
			return <p className="inline-flex rounded-full bg-meta-5 bg-opacity-10 py-1 px-3 text-sm font-medium text-meta-5">Инвестиция</p>;
		}

		if (type === TransactionDto.transactionType.SALE) {
			return <p className="inline-flex rounded-full bg-meta-8 bg-opacity-10 py-1 px-3 text-sm font-medium text-meta-8">Продажи</p>;
		}
	};

	const openEdit = (data: TransactionDto) => {
		setActionData({
			id: data.id,
			typeAction: 'update',
			data,
		});
	};

	const openDelete = (data: TransactionDto) => {
		setActionData({
			id: data.id,
			data,
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
						<div className="font-medium text-black dark:text-white text-sm">{item.description}</div>
					</td>
					<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
						<div className="font-medium text-black dark:text-white text-sm">{item.purchasePrice}</div>
					</td>
					<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
						<div className="font-medium text-black dark:text-white text-sm">{item.currentPrice}</div>
					</td>
					<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
						<div className="font-medium text-black dark:text-white text-sm">{item.owesPrice}</div>
					</td>
					<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
						<div className="font-medium text-black dark:text-white text-sm">{item.purchaseAmount}</div>
					</td>
					<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
						<div className="font-medium text-black dark:text-white text-sm">{item.currentAmount}</div>
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
		<div className="rounded-md border border-stroke bg-white px-5 pb-3 pt-5 shadow-default dark:border-strokedark dark:bg-boxdark">
			{filters}
			<div className="max-w-full overflow-x-auto">
				{!data.length && (
					<div className="flex justify-center items-center text-sm h-30">
						<p>Транзакции не найдены</p>
					</div>
				)}
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
			{pagination}
		</div>
	);
};

export default TransactionTable;
