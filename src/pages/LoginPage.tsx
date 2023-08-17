import React, { Link, useNavigate } from 'react-router-dom';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import { FC, useCallback, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { changeIsAuth, setUser } from '../store/features/profile';
import { loginApi } from '../api/auth';
import { KEY__AUTH_TOKEN, ROUTE__MAIN } from '../constants';
import { LoginRequestDto } from '../api';
import { isEmail } from '../helpers';
import { NOTIFY_TYPES, useNotify } from '../hooks/useNotify';

const SignIn: FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { notify } = useNotify();

	const EMAIL_ERROR = 'Введите корректный email';

	const PASSWORD_ERROR = 'Пароль должен содерждать минимум 3 символа';

	const profile = useAppSelector(state => state.profile);

	const [currentUser, setCurrentUser] = useState<LoginRequestDto>({ email: '', password: '' });

	const [isTouched, setIsTouched] = useState<boolean>(false);

	const hasEmailError = useMemo(() => !currentUser.email || !isEmail(currentUser.email), [currentUser.email]);

	const hasPasswordError = useMemo(() => !currentUser.password, [currentUser.password]);

	const hasTouchedEmailError: boolean = useMemo(() => hasEmailError && isTouched, [hasEmailError, isTouched]);

	const hasTouchedPasswordError: boolean = useMemo(() => hasPasswordError && isTouched, [hasPasswordError, isTouched]);

	const validateForm = () => {
		if (hasEmailError || hasPasswordError) return false;
		return true;
	};

	const clickHandler = useCallback(async () => {
		setIsTouched(true);

		if (validateForm()) {
			try {
				const { user, token } = await loginApi(currentUser);

				localStorage.setItem(KEY__AUTH_TOKEN, token);

				dispatch(changeIsAuth(true));

				dispatch(setUser(user));

				navigate(ROUTE__MAIN, {
					replace: true,
				});
			} catch (e) {
				notify(NOTIFY_TYPES.ERROR, e.body?.message);
			}
		}
	}, [isTouched, navigate, currentUser, dispatch, hasEmailError, hasPasswordError]);

	return (
		<>
			<div className="w-full p-4 sm:p-12.5 xl:p-17.5">
				<h1>{profile.user?.name}</h1>
				<h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">Sign in</h2>

				<form>
					<Input
						label="Email"
						type="text"
						classesType="auth"
						hasError={hasTouchedEmailError}
						errorMessage={EMAIL_ERROR}
						placeholder="Enter your email"
						value={currentUser.email}
						onChange={e => setCurrentUser({ ...currentUser, email: e.target.value })}
						icon={
							<Icon
								name={'email'}
								width={22}
								height={22}
							/>
						}
					/>

					<Input
						label="Password"
						type="password"
						className={'mb-6'}
						classesType="auth"
						hasError={hasTouchedPasswordError}
						errorMessage={PASSWORD_ERROR}
						placeholder="6+ Characters, 1 Capital letter"
						value={currentUser.password}
						onChange={e => setCurrentUser({ ...currentUser, password: e.target.value })}
						icon={
							<Icon
								name={'lock'}
								width={22}
								height={22}
							/>
						}
					/>

					<Button
						title={'Sign in'}
						className="p-4 text-white"
						clickHandler={clickHandler}
					/>

					<div className="mt-6 text-center">
						<p>
							Don’t have any account?{' '}
							<Link
								to="/auth/register"
								className="text-primary"
							>
								Sign Up
							</Link>
						</p>
					</div>
				</form>
			</div>
		</>
	);
};

export default SignIn;
