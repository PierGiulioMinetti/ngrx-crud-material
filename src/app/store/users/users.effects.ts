import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as UsersActions from './users.action';
import { catchError, map, mergeMap, of } from "rxjs";
import { User } from "src/app/models/user.model";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class UsersEffects {
  url = 'http://localhost:3000/users';
  constructor(
    //uso http service invece di un servizio mio, perchè mi da errore la tipizzazione della get
    private http: HttpClient,
    private actions$: Actions
  ){

  }

  loadUsers$ = createEffect(()=> this.actions$.pipe(
    ofType(UsersActions.loadUsers),
    mergeMap(()=> this.http.get<User[]>(this.url).pipe(
      map(users=> UsersActions.loadUsersSuccess({users})),
      catchError((error)=> of(UsersActions.loadUsersFailed({error})))
    ))
  ));

  addUser$ = createEffect(()=> this.actions$.pipe(
    ofType(UsersActions.addUsers),
    mergeMap((user)=> this.http.post<User>(this.url, user.user).pipe(
      map(user=> UsersActions.addUsersSuccess({user})),
      catchError((error)=> of(UsersActions.addUsersFailed({error})))
    ))
  ));

  editUsers$ = createEffect(()=> this.actions$.pipe(
    ofType(UsersActions.editUser),
    mergeMap((user) => this.http.put<User>(this.url  + '/' + user.user.id, user.user).pipe(
      map(user=> UsersActions.editUserSuccess({user})),
      catchError((error)=> of(UsersActions.editUserFailed({error})))
    ))
  ));

  deleteUser$ = createEffect(()=> this.actions$.pipe(
    ofType(UsersActions.deleteUser),
    mergeMap((user)=> this.http.delete<User>(this.url + '/' + user.user.id).pipe(
      map(user=> UsersActions.deleteUserSuccess({user})),
      catchError((error)=> of(UsersActions.deleteUserFailed({error})))
    ))
  ))
}
