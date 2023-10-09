import DeleteModal from 'common/components/modals/DeleteModal';
import InvestmentTable from 'domains/investment/components/InvestmentTable';
import useCapitalizationPage from 'domains/investment/hooks/useInvestmentPage';
import Button from 'common/components/ui/Button';
import CreateUpdateInvestmentModal from 'domains/investment/components/CreateUpdateInvestmentModal';
import TableFilters from 'domains/investment/components/InvestmentTableFilters';
import Pagination from 'common/components/pagination/Pagination';
import PageHeader from 'common/components/page-header/PageHeader';
import { useAppDispatch } from 'store';
import { useEffect } from 'react';
import { changeBreadcrumbs } from 'store/features/common';

const InvestmentsPage = () => {
	const { investments, isLoading, filters, actionData, pageCount, page, setPage, setFilters, setActionData, deleteInvestment, onCreateUpdateSaleInvestment } =
		useCapitalizationPage();

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(
			changeBreadcrumbs([
				{
					title: 'Инвестиции',
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
				title="Инвестиции"
				right={
					<Button
						clickHandler={() => setActionData({ typeAction: 'create' })}
						title={'Добавить'}
						className={`w-36 p-2 text-sm  text-boxdark dark:bg-boxdark dark:border-boxdark dark:text-white bg-white border-white`}
					/>
				}
			/>
			<InvestmentTable
				isLoading={isLoading}
				hasActions={true}
				data={investments}
				setActionData={setActionData}
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
			{(actionData?.typeAction === 'create' || actionData?.typeAction === 'update' || actionData?.typeAction === 'sell') && (
				<CreateUpdateInvestmentModal
					id={actionData?.id}
					data={actionData?.data}
					typeAction={actionData?.typeAction}
					onCreateUpdateInvestment={onCreateUpdateSaleInvestment}
					close={() => setActionData(null)}
				/>
			)}

			<DeleteModal
				title={`Удалить инвестицию ?`}
				description={`Вы точно хотите удалить инвестицию ?`}
				cancel={() => setActionData(null)}
				confirm={deleteInvestment}
				isOpen={!!(actionData?.typeAction === 'delete' && actionData?.id)}
			/>
		</div>
	);
};

export default InvestmentsPage;
