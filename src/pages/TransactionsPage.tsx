import TransactionTable from 'domains/transaction/components/TransactionsTable';
import DeleteModal from 'common/components/modals/DeleteModal';
import CreateUpdateModal from 'domains/transaction/components/CreateUpdateTransactionModal';
import Button from 'common/components/ui/Button';
import useTransactionPage from 'domains/transaction/hooks/useTransactionPage';
import { useEffect } from 'react';
import PageHeader from 'common/components/page-header/PageHeader';
import Pagination from 'common/components/pagination/Pagination';
import TableFilters from 'domains/transaction/components/TransactionTableFilters';
import { useAppDispatch } from 'store';
import { changeBreadcrumbs } from 'store/features/common';

const TransactionsPage = () => {
	const { transactions, actionData, filters, pageCount, page, isLoading, setPage, setFilters, setActionData, onCreateUpdateTransaction, onDeleteTransaction } =
		useTransactionPage();

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(
			changeBreadcrumbs([
				{
					title: 'Транзакции',
					url: '',
				},
			])
		);

		return function clean() {
			dispatch(changeBreadcrumbs([]));
		};
	});

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
				data={transactions}
				setActionData={setActionData}
				hasActions={true}
				isLoading={isLoading}
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
			{(actionData?.typeAction === 'create' || actionData?.typeAction === 'update') && (
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
