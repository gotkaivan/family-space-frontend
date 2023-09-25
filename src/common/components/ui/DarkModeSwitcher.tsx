import useColorMode from '../../hooks/useColorMode';
import Icon from './LucideIcon';

const DarkModeSwitcher = () => {
	const [colorMode, setColorMode] = useColorMode();

	return (
		<li>
			<label className={`relative m-0 block h-4.5 w-8.5 rounded-full ${colorMode === 'dark' ? 'bg-form-strokedark' : 'bg-stroke'}`}>
				<input
					type="checkbox"
					onChange={() => {
						if (typeof setColorMode === 'function') {
							setColorMode(colorMode === 'light' ? 'dark' : 'light');
						}
					}}
					className="dur absolute top-0 z-50 m-0 h-full w-full cursor-pointer opacity-0"
				/>
				<span
					className={`absolute top-1/2 left-[0px] flex h-4.5 w-4.5 -translate-y-1/2 translate-x-0 items-center justify-center rounded-full bg-white shadow-switcher duration-75 ease-linear ${
						colorMode === 'dark' && '!right-[3px] !translate-x-full'
					}`}
				>
					<span className="dark:hidden">
						<Icon
							name={'sun'}
							size={16}
						/>
					</span>
					<span className="hidden dark:inline-block">
						<Icon
							name={'moon'}
							size={16}
						/>
					</span>
				</span>
			</label>
		</li>
	);
};

export default DarkModeSwitcher;
