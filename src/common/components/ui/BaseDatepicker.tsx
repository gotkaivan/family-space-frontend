import { FC, useMemo } from 'react';
import Datepicker, { DateType, DateValueType } from 'react-tailwindcss-datepicker';

interface IProps {
	label?: string;
	hasError?: boolean;
	className?: string;
	errorMessage?: string;
	withError?: boolean;
	value: DateType;
	onChange: (value: string | null, e?: HTMLInputElement | null | undefined) => void;
}

const BaseDatepicker: FC<IProps> = ({ label = '', value, onChange, className = '', withError = true, hasError = false, errorMessage = '' }) => {
	const getErrorMessage = () => {
		if (!withError) return null;
		return hasError ? <p className="text-danger text-sm mt-2">{errorMessage}</p> : <p className="text-sm opacity-0">Error</p>;
	};

	const dateValue = useMemo(() => {
		return {
			startDate: value,
			endDate: value,
		};
	}, [value]);

	const onChangeHandler = (val: DateValueType, e?: HTMLInputElement | null | undefined) => {
		onChange(val?.startDate ? new Date(val?.startDate).toISOString() : null, e);
	};

	return (
		<div className={'mb-4 ' + className}>
			{label && <label className="mb-2.5 block font-medium text-black dark:text-white">{label}</label>}
			<Datepicker
				value={dateValue}
				onChange={onChangeHandler}
				useRange={false}
				asSingle={true}
				displayFormat={'DD.MM.YYYY'}
				inputClassName={`relative appearance-none border-stroke bg-transparent py-3 outline-none transition active:border-primary  w-full rounded-sm border bg-white focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:focus:border-primary px-4.5`}
			/>
			{getErrorMessage()}
		</div>
	);
};

export default BaseDatepicker;
