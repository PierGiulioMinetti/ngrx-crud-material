import { createAction, props } from "@ngrx/store";
import { User } from "src/app/models/user.model";

export const loadUsers = createAction('[load Users] load users');
export const loadUsersSuccess = createAction('[load Users] load users Success', props<{users: User[]}>());
export const loadUsersFailed = createAction('[load Users] load users Failed', props<{error: string}>());

export const addUsers = createAction('[add Users] add users', props<{user: User}>());
export const addUsersSuccess = createAction('[add Users] add users Success', props<{user: User}>());
export const addUsersFailed = createAction('[add Users] add users Failed', props<{error: string}>());

export const editUser = createAction('[edit Users] edit users', props<{user: User}>());
export const editUserSuccess = createAction('[edit Users] edit users Success', props<{user: User}>());
export const editUserFailed = createAction('[edit Users] edit users Failed', props<{error: string}>());

export const deleteUser = createAction('[delete Users] delete users', props<{user: User}>());
export const deleteUserSuccess = createAction('[delete Users] delete users Success', props<{user: User}>());
export const deleteUserFailed = createAction('[delete Users] delete users Failed', props<{error: string}>());
