import React, { FC, InputHTMLAttributes } from 'react';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
	id: string;
	label?: string;
	className?: string;
	rows?: number;
	placeholder?: string;
	register?: any;
}

const Textarea: FC<IProps> = ({ label, id, className = '', rows = 7, placeholder = '', register, ...rest }) => {
	return (
		<div className={'mb-4 ' + className}>
			{label && <label className="mb-2.5 text-sm block font-medium text-black dark:text-white">{label}</label>}

			<textarea
				id={id}
				rows={rows}
				placeholder={placeholder}
				{...register}
				{...rest}
				className="w-full rounded-md border border-stroke bg-white py-3 px-4.5 focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:focus:border-primary text-sm"
			></textarea>
		</div>
	);
};

export default Textarea;
