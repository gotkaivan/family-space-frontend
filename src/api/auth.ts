import { UserDto, AuthService, CancelablePromise, LoginRequestDto, RegisterRequestDto } from './';

export const loginApi = (requestBody: LoginRequestDto): CancelablePromise<UserDto> => {
	return AuthService.authControllerLogin(requestBody);
};

export const registerApi = (requestBody: RegisterRequestDto): CancelablePromise<UserDto> => {
	return AuthService.authControllerRegister(requestBody);
};

export const logoutApi = (): CancelablePromise<void> => {
	return AuthService.authControllerLogout();
};
