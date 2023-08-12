import { API_HOST } from '../config/global';
import { AuthResponseDto, OpenAPI, RegisterRequestDto } from './index';
import { AuthService, CancelablePromise, LoginRequestDto } from './index';

OpenAPI.BASE = API_HOST;

export const loginApi = (requestBody: LoginRequestDto): CancelablePromise<AuthResponseDto> => {
	return AuthService.authControllerLogin(requestBody);
};

export const registerApi = (requestBody: RegisterRequestDto): CancelablePromise<AuthResponseDto> => {
	return AuthService.authControllerRegister(requestBody);
};

export const logoutApi = (): CancelablePromise<void> => {
	return AuthService.authControllerLogout();
};
