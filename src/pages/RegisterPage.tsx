import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from 'common/components/ui/Input';
import { useAppDispatch } from 'store';
import { isEmail } from 'common/helpers';
import { changeIsAuth, setUser } from 'store/features/profile';
import { ROUTE__MAIN } from 'common/constants';
import { registerApi } from 'api/auth';
import { NOTIFY_TYPES, useNotify } from 'common/hooks/useNotify';
import Button from 'common/components/ui/Button';
import { RegisterRequestDto } from 'generated/api';
import Icon from 'common/components/ui/Icon';
import { SubmitHandler, useForm } from 'react-hook-form';

type WithRepeatedPassword = {
	repeatedPassword: string;
};

const RegisterPage = () => {
	const navigate = useNavigate();

	const dispatch = useAppDispatch();

	const { notify } = useNotify();

	const {
		register,
		handleSubmit,
		getValues,
		watch,
		formState: { errors },
	} = useForm<RegisterRequestDto & WithRepeatedPassword>({});

	const onClickHandler: SubmitHandler<RegisterRequestDto & WithRepeatedPassword> = async (form: RegisterRequestDto & WithRepeatedPassword) => {
		try {
			const { repeatedPassword, ...currentUser } = form;

			const user = await registerApi(currentUser);

			dispatch(changeIsAuth(true));

			dispatch(setUser(user));

			notify(NOTIFY_TYPES.SUCCESS, 'Пользователь успешно создан');

			navigate(ROUTE__MAIN, {
				replace: true,
			});
		} catch (e: any) {
			notify(NOTIFY_TYPES.ERROR, e.body?.message);
		}
	};

	return (
		<>
			<div className="w-full p-4 sm:p-12.5 xl:p-17.5">
				<h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">Регистрация</h2>

				<form onSubmit={handleSubmit(onClickHandler)}>
					<Input
						id="name"
						type={'text'}
						label="Имя"
						classesType="auth"
						placeholder="Введите ваше полное имя"
						hasError={!!errors.name?.message}
						errorMessage={errors.name?.message}
						register={register('name', {
							required: 'Имя должно содерждать минимум 2 символа',
						})}
						icon={
							<Icon
								name={'user'}
								size={22}
								className="text-body opacity-65"
							/>
						}
					/>

					<Input
						id="email"
						type={'text'}
						label="Email"
						classesType="auth"
						placeholder="Введите ваш email"
						hasError={!!errors.email?.message}
						errorMessage={errors.email?.message}
						register={register('email', {
							validate: {
								matchPattern: v => isEmail(v) || 'Введите корректный email',
							},
						})}
						icon={
							<Icon
								size={22}
								name={'mail'}
							/>
						}
					/>

					<Input
						id="password"
						type={'password'}
						label="Пароль"
						classesType="auth"
						placeholder="Введите ваш пароль"
						hasError={!!errors.password?.message}
						errorMessage={errors.password?.message}
						register={register('password', {
							required: 'Пароль должен содерждать минимум 3 символа',
						})}
						icon={
							<Icon
								name={'lock'}
								size={22}
							/>
						}
					/>

					<Input
						id="re-password"
						type={'password'}
						label="Повторный пароль"
						classesType="auth"
						placeholder="Повторите пароль"
						register={register('repeatedPassword', {
							required: 'Пароль должен содерждать минимум 3 символа',
							validate: (val: string) => {
								if (watch('password') != val) {
									return 'Введите пароль повторно';
								}
							},
						})}
						hasError={!!errors.repeatedPassword?.message}
						errorMessage={errors.repeatedPassword?.message}
						className="mb-6"
						icon={
							<Icon
								name={'lock'}
								size={22}
							/>
						}
					/>

					<Button
						type="submit"
						title={'Зарегистрироваться'}
						className="mb-5 p-4 text-white"
					/>

					<div className="mt-6 text-center">
						<p>
							У вас есть аккаунт ?{' '}
							<Link
								to="/auth/login"
								className="text-primary"
							>
								Войти
							</Link>
						</p>
					</div>
				</form>
			</div>
		</>
	);
};

export default RegisterPage;
