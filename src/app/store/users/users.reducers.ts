import { createReducer, on } from "@ngrx/store";
import { User } from "src/app/models/user.model";
import * as UsersActions from './users.action';

export interface UsersState {
  list: User[],
  active: User,
  error: string
};

const initialState: UsersState = {
  list: [],
  active: {} as User,
  error: ''
};

export const usersReducer = createReducer(
  initialState,
  on(UsersActions.loadUsersSuccess, (state, action)=>{
    return {
      ...state,
      list: [...action.users]
    }
  }),
  on(UsersActions.loadUsersFailed, (state, action)=>{
    return {
      ...state,
      error: 'Load Users Failed!'
    }
  }),
  on(UsersActions.addUsersSuccess, (state, action)=>{
    return {
      ...state,
      // list: [...state.list, {...action.user, id: state.list.length + 1}],
      list: [...state.list, {...action.user}],
      error: ''
    }
  }),
  on(UsersActions.addUsersFailed, (state, action)=>{
    return {
      ...state,
      list: [...state.list],
      error: 'Add User Failed!'
    }
  }),
  on(UsersActions.editUserSuccess, (state, action)=>{
    return {
      ...state,
      list: state.list.map((user)=>{
        if(user.id === action.user.id){
          return action.user;
        } else {
          return user
        }
      }),
      error: ''
    }
  }),
  on(UsersActions.editUserFailed, (state, action)=>{
    return {
      ...state,
      list: state.list,
      error: 'Edit User Failed!'
    }
  }),
  on(UsersActions.deleteUserSuccess, (state, action)=>{
    return {
      ...state,
      list: state.list.filter((user)=>{
        return user.id !== action.user.id
      }),
      error: ''
    }
  }),
  on(UsersActions.deleteUserFailed, (state, action)=>{
    return {
      ...state,
      list: state.list,
      error: 'Delete User Failed!'
    }
  }),

)
