import React, { useCallback, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Icon from '../components/ui/Icon';
import { useAppDispatch, useAppSelector } from '../store';
import { RegisterRequestDto } from '../api';
import { isEmail } from '../helpers';
import { changeIsAuth, setUser } from '../store/features/profile';
import { KEY__AUTH_TOKEN, ROUTE__MAIN } from '../constants';
import { registerApi } from '../api/auth';
import { NOTIFY_TYPES, useNotify } from '../hooks/useNotify';

const RegisterPage = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const { notify } = useNotify();

	const EMAIL_ERROR = 'Введите корректный email';

	const NAME_ERROR = 'Имя должно содерждать минимум 2 символа';

	const PASSWORD_ERROR = 'Пароль должен содерждать минимум 3 символа';

	const REPEATED_PASSWORD_ERROR = 'Введите пароль повторно';

	const profile = useAppSelector(state => state.profile);

	const [currentUser, setCurrentUser] = useState<RegisterRequestDto>({ email: '', name: '', password: '' });

	const [isTouched, setIsTouched] = useState<boolean>(false);

	const [repeatedPassword, setRepeatedPassword] = useState<string>('');

	const hasNameError = useMemo(() => !currentUser.name && isTouched, [currentUser.name, isTouched]);

	const hasEmailError = useMemo(() => (!currentUser.email || !isEmail(currentUser.email)) && isTouched, [currentUser.email, isTouched]);

	const hasPasswordError = useMemo(() => !currentUser.password && isTouched, [currentUser.password, isTouched]);

	const hasRepeatedPasswordError = useMemo(() => currentUser.password !== repeatedPassword && isTouched, [currentUser.password, repeatedPassword, isTouched]);

	const isFormValid = useMemo(() => !(hasEmailError || hasPasswordError || hasNameError), [hasEmailError, hasPasswordError, hasNameError]);

	const clickHandler = useCallback(async () => {
		setIsTouched(true);

		if (isFormValid) {
			try {
				const { user, token } = await registerApi(currentUser);

				localStorage.setItem(KEY__AUTH_TOKEN, token);

				dispatch(changeIsAuth(true));

				dispatch(setUser(user));

				notify(NOTIFY_TYPES.SUCCESS, 'Пользователь успешно создан');

				navigate(ROUTE__MAIN, {
					replace: true,
				});
			} catch (e) {
				notify(NOTIFY_TYPES.ERROR, e);
			}
		}
	}, [navigate, currentUser, dispatch, isFormValid]);
	return (
		<>
			<div className="w-full p-4 sm:p-12.5 xl:p-17.5">
				<h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">Sign Up</h2>

				<form>
					<Input
						type={'text'}
						label="Name"
						placeholder="Enter your full name"
						hasError={hasNameError}
						errorMessage={NAME_ERROR}
						value={currentUser.name}
						onChange={e => setCurrentUser({ ...currentUser, name: e.target.value })}
						icon={
							<Icon
								name={'profile'}
								width={22}
								height={22}
								color="text-body opacity-65"
							/>
						}
					/>

					<Input
						type={'text'}
						label="Email"
						placeholder="Enter your email"
						value={currentUser.email}
						hasError={hasEmailError}
						errorMessage={EMAIL_ERROR}
						onChange={e => setCurrentUser({ ...currentUser, email: e.target.value })}
						icon={
							<Icon
								width={22}
								height={22}
								name={'email'}
							/>
						}
					/>

					<Input
						type={'password'}
						label="Password"
						placeholder="Enter your password"
						value={currentUser.password}
						hasError={hasPasswordError}
						errorMessage={PASSWORD_ERROR}
						onChange={e => setCurrentUser({ ...currentUser, password: e.target.value })}
						icon={
							<Icon
								name={'lock'}
								width={22}
								height={22}
							/>
						}
					/>

					<Input
						type={'password'}
						label="Re-type Password"
						placeholder="Re-enter your password"
						value={repeatedPassword}
						onChange={e => setRepeatedPassword(e.target.value)}
						hasError={hasRepeatedPasswordError}
						errorMessage={REPEATED_PASSWORD_ERROR}
						className="mb-6"
						icon={
							<Icon
								name={'lock'}
								width={22}
								height={22}
							/>
						}
					/>

					<Button
						title={'Create account'}
						clickHandler={clickHandler}
						className="mb-5"
					/>

					<div className="mt-6 text-center">
						<p>
							Already have an account?{' '}
							<Link
								to="/auth/login"
								className="text-primary"
							>
								Sign in
							</Link>
						</p>
					</div>
				</form>
			</div>
		</>
	);
};

export default RegisterPage;
