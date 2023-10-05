import { FC, useEffect, useState } from 'react';
import TailwindDatepicker, { DateRangeType, DateValueType } from 'react-tailwindcss-datepicker';

interface IProps {
	id: string;
	value?: string | DateRangeType | null;
	label?: string;
	hasError?: boolean;
	className?: string;
	errorMessage?: string;
	withError?: boolean;
	setValue?: any;
	withDefaultValue?: boolean;
	placeholder?: string;
	asSingle?: boolean;
}

const DEFAULT_DATE: DateRangeType = {
	startDate: new Date().toISOString(),
	endDate: new Date().toISOString(),
};

const Datepicker: FC<IProps> = ({
	id,
	value,
	placeholder,
	label = '',
	className = '',
	withError = true,
	hasError = false,
	errorMessage = '',
	setValue,
	withDefaultValue = true,
	asSingle = true,
}) => {
	const [dateValue, setDateValue] = useState<DateValueType>(withDefaultValue ? DEFAULT_DATE : null);

	const getErrorMessage = () => {
		if (!withError) return null;
		return hasError ? <p className="text-danger text-sm mt-2">{errorMessage}</p> : <p className="text-sm opacity-0">Error</p>;
	};

	const onChangeHandler = (val: DateValueType) => {
		let date;
		if (typeof value === 'string' || asSingle) {
			date = val?.startDate ? new Date(val?.startDate).toISOString() : null;
		} else {
			date = {
				startDate: val?.startDate ? new Date(val?.startDate).toISOString() : null,
				endDate: val?.endDate ? new Date(val?.endDate).toISOString() : null,
			};
		}
		setValue(id, date, { shouldDirty: true });
		setDateValue(val);
	};

	useEffect(() => {
		if (value) {
			const data = typeof value === 'string' ? { startDate: value, endDate: value } : value;
			setDateValue(data);
		}
	}, [value]);

	return (
		<div className={'mb-4 ' + className}>
			{label && <label className="mb-2.5 block font-medium text-black dark:text-white">{label}</label>}
			<TailwindDatepicker
				value={dateValue}
				onChange={onChangeHandler}
				readOnly={true}
				useRange={false}
				asSingle={asSingle}
				displayFormat={'DD.MM.YYYY'}
				placeholder={placeholder}
				inputClassName={`relative appearance-none border-stroke bg-transparent py-3 outline-none transition active:border-primary  w-full rounded-md border bg-white focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:focus:border-primary px-4.5 text-sm`}
			/>
			{getErrorMessage()}
		</div>
	);
};

export default Datepicker;
