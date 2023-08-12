import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserDto } from '../../generated/api';

interface ProfileStoreState {
	isAuth: boolean;
	user: UserDto | null;
}

const initialState: ProfileStoreState = {
	isAuth: false,
	user: null,
};

export const ProfileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {
		changeIsAuth: (state, action: PayloadAction<boolean>) => {
			state.isAuth = action.payload;
		},
		setUser: (state, action: PayloadAction<UserDto | null>) => {
			state.user = action.payload;
		},
	},
});

export default ProfileSlice.reducer;

export const { changeIsAuth, setUser } = ProfileSlice.actions;
