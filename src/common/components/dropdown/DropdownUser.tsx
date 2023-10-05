import React, { useCallback, useEffect, useRef, useState } from 'react';
import UserImg from '../../assets/images/user/user-01.png';

import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store';
import { logoutApi } from 'api/auth';
import { KEY__AUTH_TOKEN, ROUTE__LOGIN } from '../../constants';
import { changeIsAuth, setUser } from '../../../store/features/profile';
import Icon from '../ui/Icon';

const DropdownUser = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const { user } = useAppSelector(state => state.profile);

	const trigger = useRef<any>(null);
	const dropdown = useRef<any>(null);

	const logout = useCallback(async () => {
		await logoutApi();
		localStorage.setItem(KEY__AUTH_TOKEN, '');

		dispatch(changeIsAuth(false));

		dispatch(setUser(null));
		window.document.body.classList.remove('dark');
		navigate(ROUTE__LOGIN, {
			replace: true,
		});
	}, []);

	useEffect(() => {
		const clickHandler = ({ target }: MouseEvent) => {
			if (!dropdown.current) return;
			if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
			setDropdownOpen(false);
		};
		document.addEventListener('click', clickHandler);
		return () => document.removeEventListener('click', clickHandler);
	});

	useEffect(() => {
		const keyHandler = ({ keyCode }: KeyboardEvent) => {
			if (!dropdownOpen || keyCode !== 27) return;
			setDropdownOpen(false);
		};
		document.addEventListener('keydown', keyHandler);
		return () => document.removeEventListener('keydown', keyHandler);
	});

	return (
		<div className="relative">
			<Link
				ref={trigger}
				onClick={() => setDropdownOpen(!dropdownOpen)}
				className="flex items-center gap-4"
				to="#"
			>
				<span className="hidden text-right lg:block">
					<span className="block font-medium text-black dark:text-white text-sm">{user?.name}</span>
				</span>

				<span className="h-11 w-11 rounded-full">
					<img
						src={UserImg}
						alt="User"
					/>
				</span>

				<Icon
					name={'chevron-down'}
					size={14}
					className={`hidden fill-current sm:block ${dropdownOpen ? 'rotate-180' : ''}`}
				/>
			</Link>

			<div
				ref={dropdown}
				onFocus={() => setDropdownOpen(true)}
				onBlur={() => setDropdownOpen(false)}
				className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${
					dropdownOpen === true ? 'block' : 'hidden'
				}`}
			>
				<ul className="flex flex-col gap-5 border-b border-stroke px-6 py-4 dark:border-strokedark">
					<li>
						<Link
							to="/profile"
							className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary text-md"
						>
							<Icon
								name={'user'}
								size={18}
							/>
							Мой профиль
						</Link>
					</li>
				</ul>
				<button
					onClick={() => logout()}
					className="flex items-center gap-3.5 py-4 px-6 text-sm font-medium duration-300 ease-in-out hover:text-primary text-md"
				>
					<Icon
						name={'log-out'}
						size={18}
					/>
					Выйти
				</button>
			</div>
		</div>
	);
};

export default DropdownUser;
