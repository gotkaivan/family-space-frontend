import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IBreadcrumb } from 'common/types';

interface ProfileStoreState {
	breadcrumbs: IBreadcrumb[];
}

const initialState: ProfileStoreState = {
	breadcrumbs: [],
};

export const CommonSlice = createSlice({
	name: 'common',
	initialState,
	reducers: {
		changeBreadcrumbs: (state, action: PayloadAction<IBreadcrumb[]>) => {
			state.breadcrumbs = action.payload;
		},
	},
});

export default CommonSlice.reducer;

export const { changeBreadcrumbs } = CommonSlice.actions;
