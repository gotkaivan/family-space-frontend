import TransactionTable from 'domains/transaction/components/TransactionsTable';
import DeleteModal from 'common/components/modals/DeleteModal';
import CreateUpdateModal from 'domains/transaction/components/CreateUpdateTransactionModal';
import Button from 'common/components/ui/Button';
import useTransactionPage from 'domains/transaction/hooks/useTransactionPage';
import { useMemo } from 'react';
import PageHeader from 'common/components/page-header/PageHeader';
import Pagination from 'common/components/pagination/Pagination';
import TableFilters from 'domains/transaction/components/TableFilters';

const TransactionsPage = () => {
	const { transactions, actionData, filters, pageCount, page, setPage, setFilters, setActionData, onCreateUpdateTransaction, onDeleteTransaction } = useTransactionPage();

	const reversedTransactions = useMemo(() => {
		return transactions.reverse();
	}, [transactions]);

	return (
		<div>
			<PageHeader
				title="Транзакции"
				right={
					<Button
						clickHandler={() => setActionData({ typeAction: 'create' })}
						title={'Добавить'}
						className={`w-36 p-2 text-sm  text-boxdark dark:bg-boxdark dark:border-boxdark dark:text-white bg-white border-white`}
					/>
				}
			/>

			<TransactionTable
				data={reversedTransactions}
				setActionData={setActionData}
				hasActions={true}
				filters={
					<TableFilters
						filters={filters}
						setFilters={setFilters}
					/>
				}
				pagination={
					<Pagination
						pageCount={pageCount}
						page={page}
						setPage={setPage}
					/>
				}
			/>
			{(actionData?.typeAction === 'create' || actionData?.typeAction === 'edit') && (
				<CreateUpdateModal
					id={actionData?.id}
					data={actionData?.data}
					onCreateUpdateTask={onCreateUpdateTransaction}
					close={() => setActionData(null)}
				/>
			)}

			<DeleteModal
				title={`Удалить транзакцию ?`}
				description={`Вы точно хотите удалить транзакцию ?`}
				cancel={() => setActionData(null)}
				confirm={onDeleteTransaction}
				isOpen={!!(actionData?.typeAction === 'delete' && actionData?.id)}
			/>
		</div>
	);
};

export default TransactionsPage;
