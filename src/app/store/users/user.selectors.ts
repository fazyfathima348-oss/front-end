import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./user.reducers";

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectAllUsers = createSelector(
    selectUserState, (state) => state.users
);

export const selectUserLoading = createSelector(
    selectUserState, (state) => state.loading
);

export const selectUSerMessage = createSelector(
     selectUserState, (state) => state.message
);