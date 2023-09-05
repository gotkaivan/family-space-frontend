import React, { FC, InputHTMLAttributes } from 'react';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	className?: string;
	rows?: number;
	value: string;
	onChange: (e: any) => void;
}

const Textarea: FC<IProps> = ({ label, className = '', rows = 7, value = '', onChange }) => {
	return (
		<div className={'mb-4 ' + className}>
			{label && <label className="mb-2.5 block font-medium text-black dark:text-white">{label}</label>}

			<textarea
				value={value}
				onChange={onChange}
				rows={rows}
				placeholder="Enter task description"
				className="w-full rounded-sm border border-stroke bg-white py-3 px-4.5 focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:focus:border-primary"
			></textarea>
		</div>
	);
};

export default Textarea;
