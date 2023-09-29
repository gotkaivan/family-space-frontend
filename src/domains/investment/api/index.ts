import { CancelablePromise, TransactionDto, InvestmentsService } from 'api';

export const getInvestmentsApi = (): CancelablePromise<TransactionDto[]> => {
	return InvestmentsService.investmentControllerGetInvestments();
};
