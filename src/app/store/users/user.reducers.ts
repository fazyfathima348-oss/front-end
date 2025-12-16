import { createReducer, on } from "@ngrx/store";
import * as UserActions from './user.actions';
import { User } from "../../models/user.model";

export interface UserState {

    users: User[];
    loading: boolean;
    error: any;
    message: string | null;

}

export const initialState: UserState = {

    users: [],
    loading: false,
    error: null,
    message: null,

};

export const userReducer = createReducer (
    initialState,

    on(UserActions.loadUsers, (state) => ({...state, loading: true})),
    on(UserActions.loadUserSuccess, (state, { users }) => ({
        ...state,
        loading: false,
        users,
    })),

    on(UserActions.loadUserFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(UserActions.addUserSuccess, (state, { user }) => ({
        ...state,
        users: [...state.users, user],
        message: 'User Added Successfully!!!',
    })),

    on(UserActions.updateUserSuccess, (state, { user }) => ({
        ...state,
        users: state.users.map((u) => (u.id === user.id? user : u)),
        message: 'User Updated Succesfully!!!',
    })),

    on(UserActions.deleteUserSuccess, (state, { id }) => ({
        ...state,
        users: state.users.filter((u) => u.id  !== id),
        message: 'User Deleted Successfully!!!',
    })),

    on(UserActions.clearMessage, (state) => ({ ...state, message: null }))

  
);