import { createAction, props } from "@ngrx/store";
import { User } from "../../models/user.model";

export const loadUsers = createAction('[User] Load Users', props<{ role: string}>());
export const loadUserSuccess = createAction('[User] Load User Success', props<{ users: User[] }>());
export const loadUserFailure =createAction('[User] Load User Failure', props<{ error: any }>());


export const addUser = createAction('[User] Add User', props<{ user: User }>());
export const addUserSuccess = createAction('[User] Add User Success', props< {user: User} >());
export const addUserFailure = createAction('[User] Add User Failure', props<{ error: any }>());


export const updateUser = createAction('[User] Update User', props<{ user: User }>());
export const updateUserSuccess = createAction('[User] Update User Success', props< {user: User} >());
export const updateUserFailure = createAction('[User] Update User Failure', props<{ error: any }>());


export const deleteUser = createAction('[User] Delete User', props<{ id: number }>());
export const deleteUserSuccess = createAction('[User] Delete User Success', props< { id: number } >());
export const deleteUserFailure = createAction('[User] Delete User Failure', props<{ error: any }>());

export const clearMessage = createAction('[User] Clear Message');
