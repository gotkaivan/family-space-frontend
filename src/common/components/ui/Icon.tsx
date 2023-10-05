import { lazy, Suspense, useMemo } from 'react';
import { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';

export interface IIconProps extends Omit<LucideProps, 'ref'> {
	name: keyof typeof dynamicIconImports;
	size: number;
	className?: string;
}

const Icon = ({ name, size, className = '', ...props }: IIconProps) => {
	const LucideIcon = lazy(dynamicIconImports[name]);

	const fallback = <div style={{ background: '#ddd', width: size, height: size }} />;

	return useMemo(() => {
		return (
			<Suspense fallback={fallback}>
				<LucideIcon
					size={size}
					className={className}
					{...props}
				/>
			</Suspense>
		);
	}, [className, size, name]);
};

export default Icon;
