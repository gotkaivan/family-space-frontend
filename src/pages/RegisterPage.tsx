import React, { useCallback, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from 'common/components/ui/Input';
import Icon from 'common/components/ui/Icon';
import { useAppDispatch } from 'store';
import { isEmail } from 'common/helpers';
import { changeIsAuth, setUser } from 'store/features/profile';
import { KEY__AUTH_TOKEN, ROUTE__MAIN } from 'common/constants';
import { registerApi } from 'common/api/auth';
import { NOTIFY_TYPES, useNotify } from 'common/hooks/useNotify';
import Button from 'common/components/ui/Button';
import { RegisterRequestDto } from 'generated/api';

const RegisterPage = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const { notify } = useNotify();

	const EMAIL_ERROR = 'Введите корректный email';

	const NAME_ERROR = 'Имя должно содерждать минимум 2 символа';

	const PASSWORD_ERROR = 'Пароль должен содерждать минимум 3 символа';

	const REPEATED_PASSWORD_ERROR = 'Введите пароль повторно';

	// const profile = useAppSelector(state => state.profile);

	const [currentUser, setCurrentUser] = useState<RegisterRequestDto>({ email: '', name: '', password: '' });

	const [isTouched, setIsTouched] = useState<boolean>(false);

	const [repeatedPassword, setRepeatedPassword] = useState<string>('');

	const hasNameError = useMemo(() => !currentUser.name, [currentUser.name]);

	const hasEmailError = useMemo(() => !currentUser.email || !isEmail(currentUser.email), [currentUser.email]);

	const hasPasswordError = useMemo(() => !currentUser.password, [currentUser.password]);

	const hasRepeatedPasswordError = useMemo(() => currentUser.password !== repeatedPassword, [currentUser.password, repeatedPassword]);

	const hasTouchedNameError = useMemo(() => hasNameError && isTouched, [hasNameError, isTouched]);

	const hasTouchedEmailError = useMemo(() => hasEmailError && isTouched, [hasEmailError, isTouched]);

	const hasTouchedPasswordError = useMemo(() => hasPasswordError && isTouched, [hasPasswordError, isTouched]);

	const hasTouchedRepeatedPasswordError = useMemo(() => hasRepeatedPasswordError && isTouched, [hasRepeatedPasswordError, isTouched]);

	const validateForm = () => {
		if (hasNameError || hasEmailError || hasPasswordError || hasRepeatedPasswordError) return false;
		return true;
	};

	const clickHandler = useCallback(async () => {
		setIsTouched(true);

		if (validateForm()) {
			try {
				const { user, token } = await registerApi(currentUser);

				localStorage.setItem(KEY__AUTH_TOKEN, token);

				dispatch(changeIsAuth(true));

				dispatch(setUser(user));

				notify(NOTIFY_TYPES.SUCCESS, 'Пользователь успешно создан');

				navigate(ROUTE__MAIN, {
					replace: true,
				});
			} catch (e: any) {
				notify(NOTIFY_TYPES.ERROR, e.body?.message);
			}
		}
	}, [navigate, currentUser, dispatch, repeatedPassword]);
	return (
		<>
			<div className="w-full p-4 sm:p-12.5 xl:p-17.5">
				<h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">Sign Up</h2>

				<form>
					<Input
						type={'text'}
						label="Name"
						classesType="auth"
						placeholder="Enter your full name"
						hasError={hasTouchedNameError}
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
						classesType="auth"
						placeholder="Enter your email"
						value={currentUser.email}
						hasError={hasTouchedEmailError}
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
						classesType="auth"
						placeholder="Enter your password"
						value={currentUser.password}
						hasError={hasTouchedPasswordError}
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
						classesType="auth"
						placeholder="Re-enter your password"
						value={repeatedPassword}
						onChange={e => setRepeatedPassword(e.target.value)}
						hasError={hasTouchedRepeatedPasswordError}
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
						className="mb-5 p-4 text-white"
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
