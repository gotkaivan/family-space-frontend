import { FC, useMemo } from 'react';
import Icon from 'common/components/ui/Icon';
import columns from '../config/investmentTableOptions';
import { formatDate } from 'common/helpers/formatDate';
import { IActionTransactionResponseParams } from 'domains/transaction/types';
import { TransactionDto } from 'generated/api';

interface IProps {
	data: TransactionDto[];
	hasActions?: boolean;
	setActionData: (data: IActionTransactionResponseParams) => void;
}

const CapitalizationTable: FC<IProps> = ({ hasActions = false, setActionData, data }) => {
	const headerColumn = useMemo(() => {
		return columns.map(column => {
			return (
				<th
					key={column.id}
					className="py-4 px-4 font-medium text-sm text-black dark:text-white"
				>
					{column.title}
				</th>
			);
		});
	}, []);

	const actionColumn = useMemo(() => {
		if (hasActions) return <th className="py-4 px-4 font-medium text-black dark:text-white"></th>;
	}, [hasActions]);

	const openEdit = (data: TransactionDto) => {
		setActionData({
			id: data.id,
			typeAction: 'edit',
			data,
		});
	};

	const openSell = (data: TransactionDto) => {
		setActionData({
			id: data.id,
			typeAction: 'sell',
			data,
		});
	};

	const openDelete = (data: TransactionDto) => {
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
						<div className="font-medium text-black dark:text-white text-sm">{item.currentPrice}</div>
					</td>
					<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
						<div className="font-medium text-black dark:text-white text-sm">{item.amount}</div>
					</td>
					<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
						<div className="font-medium text-black dark:text-white text-sm">{item.currencyType}</div>
					</td>
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
								onClick={() => openSell(item)}
								className="hover:text-primary border boorder-white border-solid rounded-full w-5.5 h-5.5 text-sm"
							>
								$
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
				{!data.length && <div className="flex justify-center text-sm">Инвестиций пока нет</div>}
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

export default CapitalizationTable;
