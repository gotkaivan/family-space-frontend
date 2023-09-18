import DeleteModal from 'common/components/modals/DeleteModal';
import CapitalizationTable from 'domains/investment/components/InvestmentTable';
import useCapitalizationPage from 'domains/investment/hooks/useCapitalizationPage';
import Button from 'common/components/ui/Button';
import CreateUpdateInvestmentModal from 'domains/investment/components/CreateUpdateInvestmentModal';
import InvestmentSellModal from 'domains/investment/components/InvestmentSellModal';
import { IInvestment, ISellInvestment } from 'domains/investment/types';

const CapitalizationPage = () => {
	const { investments, setActionData, actionData, deleteInvestment, onActionInvestment, sellInvestment } = useCapitalizationPage();

	return (
		<div>
			<div className="flex justify-end mb-4 md:mb-6">
				<Button
					clickHandler={() => setActionData({ typeAction: 'create' })}
					title={'Добавить'}
					className={`w-36 p-2 text-sm  text-boxdark dark:bg-boxdark dark:border-boxdark dark:text-white bg-white border-white`}
				/>
			</div>
			<CapitalizationTable
				hasActions={true}
				data={investments}
				setActionData={setActionData}
			/>
			{(actionData?.typeAction === 'create' || actionData?.typeAction === 'edit') && (
				<CreateUpdateInvestmentModal
					id={actionData?.id}
					data={actionData?.data}
					onCreateUpdateInvestment={onActionInvestment}
					close={() => setActionData(null)}
				/>
			)}

			{actionData?.typeAction === 'sell' && actionData.id && actionData?.data && (
				<InvestmentSellModal
					id={actionData?.id}
					data={actionData.data}
					onSellInvestment={(sellItem: ISellInvestment, investment: IInvestment) => sellInvestment(sellItem, investment)}
					close={() => setActionData(null)}
				/>
			)}

			<DeleteModal
				title={`Удалить транзакцию ?`}
				description={`Вы точно хотите удалить транзакцию ?`}
				cancel={() => setActionData(null)}
				confirm={deleteInvestment}
				isOpen={!!(actionData?.typeAction === 'delete' && actionData?.id)}
			/>
		</div>
	);
};

export default CapitalizationPage;
