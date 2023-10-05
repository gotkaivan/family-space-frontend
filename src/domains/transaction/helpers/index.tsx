import { getRandomId } from 'common/helpers';
import { TransactionDto } from 'generated/api';

const currencyTypes = Object.keys(TransactionDto.currencyType).map(item => {
	return {
		id: getRandomId(),
		title: item,
		value: item,
	};
});

const transactionsTypeLocales = {
	[TransactionDto.transactionType.INCOME]: 'Доходы',
	[TransactionDto.transactionType.EXPENSES]: 'Расходы',
	[TransactionDto.transactionType.INVESTMENT]: 'Покупка инвестиции',
	[TransactionDto.transactionType.SALE]: 'Продажа инвестиции',
};

const transactionTypes = Object.values(TransactionDto.transactionType).map(item => {
	return {
		id: getRandomId(),
		title: transactionsTypeLocales[item],
		value: item,
	};
});

export { currencyTypes, transactionTypes };
