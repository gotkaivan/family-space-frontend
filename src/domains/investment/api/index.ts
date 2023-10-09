import {
	CancelablePromise,
	TransactionDto,
	InvestmentsService,
	InvestmentRequestOptionsDto,
	GetInvestmentsResponseDto,
	InvestmentDto,
	UpdateInvestmentResponseDto,
	SaleInvestmentResponseDto,
	CreateInvestmentResponseDto,
	DeleteInvestmentResponseDto,
} from 'api';

export const getInvestmentsApi = (options: InvestmentRequestOptionsDto): CancelablePromise<GetInvestmentsResponseDto> => {
	return InvestmentsService.investmentControllerGetInvestments(options);
};

export const createInvestmentApi = (investment: InvestmentDto): CancelablePromise<CreateInvestmentResponseDto> => {
	return InvestmentsService.investmentControllerCreateInvestment(investment);
};

export const updateInvestmentApi = (investment: InvestmentDto): CancelablePromise<UpdateInvestmentResponseDto> => {
	return InvestmentsService.investmentControllerUpdateInvestment(investment);
};

export const saleInvestmentApi = (investment: InvestmentDto): CancelablePromise<SaleInvestmentResponseDto> => {
	return InvestmentsService.investmentControllerSaleInvestment(investment);
};

export const deleteInvestmentApi = (id: number): CancelablePromise<DeleteInvestmentResponseDto> => {
	return InvestmentsService.investmentControllerDeleteInvestment(id);
};
