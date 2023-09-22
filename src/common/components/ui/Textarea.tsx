import React, { FC, InputHTMLAttributes } from 'react';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	className?: string;
	rows?: number;
	value: string;
	placeholder?: string;
	onChange: (e: any) => void;
}

const Textarea: FC<IProps> = ({ label, className = '', rows = 7, value = '', placeholder = '', onChange }) => {
	return (
		<div className={'mb-4 ' + className}>
			{label && <label className="mb-2.5 text-sm block font-medium text-black dark:text-white">{label}</label>}

			<textarea
				value={value}
				onChange={onChange}
				rows={rows}
				placeholder={placeholder}
				className="w-full rounded-md border border-stroke bg-white py-3 px-4.5 focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:focus:border-primary text-sm"
			></textarea>
		</div>
	);
};

export default Textarea;
