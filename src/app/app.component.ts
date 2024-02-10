import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addUsers, deleteUser, editUser, loadUsers } from './store/users/users.action';
import { selectUsersList } from './store/users/users.selectors';
import { UsersState } from './store/users/users.reducers';
import { User } from './models/user.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  template: `

  <h1>
    NGRX Crud
  </h1>
  <div>
    <form [formGroup]="form">
      <div>
        Name
        <input type="text" formControlName="name">
      </div>
      <div>
        Occupation
        <input type="text" formControlName="occupation">
      </div>

      <button type="submit" mat-raised-button (click)="editForm()" matTooltip="This is a tooltip!"
        color="warn">Edit
      </button>
      <button type="submit" mat-raised-button (click)="saveForm()" matTooltip="This is a tooltip!"
        color="primary">Save
      </button>


    </form>
  </div>


<!-- card -->
<div class="single-card-container"  *ngFor="let user of (users$ | async)">
  <mat-card class="example-card">
    <mat-card-header>
      <mat-card-title-group>
        <mat-card-title>  Name: {{user.name}}</mat-card-title>
        <mat-card-subtitle>Occupation: {{user.occupation}}</mat-card-subtitle>
        <img mat-card-sm-image src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=">
      </mat-card-title-group>
    </mat-card-header>
    <mat-card-content>
      {{'Bio'}}
    </mat-card-content>
  </mat-card>
  <div class="btn-choice-container">
    <button type="button" mat-raised-button (click)="editUser(user)" matTooltip="This is a tooltip!" color="primary">
      Edit
    </button>
    <button type="button" mat-raised-button (click)="deleteUser(user)" matTooltip="This is a tooltip!" color="warn">
      Delete
    </button>
  </div>
</div>
    <router-outlet></router-outlet>
  `,
  styles: [
    `
    .single-card-container{
      background-color: #80808014!important;
      width: 30%;
      border: 1px solid black;
      margin: 1rem 0;
    }

    .btn-choice-container{
      display:flex;
      justify-content: space-evenly;
      width: 50%;
      margin: 0 auto;
    }
    `
  ]
})
export class AppComponent {
  form!: FormGroup;
  url = 'http://localhost:3000/users';
  users$!: Observable<User[]>;
  userIdToEdit: string | number | undefined;

  constructor(
    private fb: FormBuilder,
    private store: Store<UsersState>,
    private http: HttpClient

  ) {

  }

  ngOnInit() {
    this.initForm();
    this.loadUsers();
  }


  initForm() {
    this.form = this.fb.group({
      name: [''],
      occupation: [''],
    });
  }

  saveForm() {
    const obj = this.form.value
    this.store.dispatch(addUsers({ user: obj }));
    this.form.reset();
  }

  loadUsers() {
    this.store.dispatch(loadUsers());
    this.users$ = this.store.select(selectUsersList);
  }

  editUser(user: User) {
    console.log('EDIT user: ', user);
    this.form.get('occupation')?.setValue(user.occupation)
    this.form.get('name')?.setValue(user.name);
    this.userIdToEdit = user.id;
    window.scrollTo(0, 0);
  }

  editForm() {
    this.store.dispatch(editUser({ user: {...this.form.value, id: this.userIdToEdit} }));
    this.form.reset();
  }

  deleteUser(user: User) {
    console.log('DELETE user: ', user);
    this.store.dispatch(deleteUser({user}));
  }
}


