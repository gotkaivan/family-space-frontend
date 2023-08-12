import { API_HOST } from '../config/global';
import { KEY__AUTH_TOKEN } from '../constants';
import { OpenAPI, UserDto, UsersService } from './index';
import { CancelablePromise } from './index';

const authToken = localStorage.getItem(KEY__AUTH_TOKEN);

OpenAPI.BASE = API_HOST;

if (authToken) {
	OpenAPI.HEADERS = {
		Authorization: `Bearer ${authToken}`,
	};
}

export const getUserByToken = (accessToken: string): CancelablePromise<UserDto> => {
	return UsersService.usersControllerGetUserByToken({ accessToken });
};
