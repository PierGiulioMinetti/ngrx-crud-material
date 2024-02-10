import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UsersState } from "./users.reducers";

//the key users is the key registered inside the appModule
export const selectUsersState = createFeatureSelector<UsersState>('users');

// Now, define a selector to access the list key
export const selectUsersList = createSelector(
  selectUsersState,
  (state: UsersState) => state.list
);
