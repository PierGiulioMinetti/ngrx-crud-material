import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addUsers, deleteUser, editUser, loadUsers } from './store/users/users.action';
import { selectUsersList } from './store/users/users.selectors';
import { UsersState } from './store/users/users.reducers';
import { User } from './models/user.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-root',
  template: `
<div class="app-container">
  <h1>
    NGRX Crud
  </h1>
  <div class="add-container">
    <div (click)="openDialog()">
      <span class="material-symbols-outlined add-icon">
        add_circle
      </span>
    </div>
    <div>
      Crea nuovo utente
    </div>
  </div>

  <!-- card -->
  <div class="single-card-container" *ngFor="let user of (users$ | async)">
    <mat-card class="example-card">
      <mat-card-header>
        <mat-card-title-group>
          <mat-card-title> Name: {{user.name}}</mat-card-title>
          <mat-card-subtitle>Occupation: {{user.occupation}}</mat-card-subtitle>
          <img mat-card-sm-image
            src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=">
        </mat-card-title-group>
      </mat-card-header>
      <mat-card-content>
        {{'Bio'}}
      </mat-card-content>
    </mat-card>
    <div class="btn-choice-container">
      <button mat-button (click)="openDialog(user)" mat-raised-button color="primary">Edit</button>
      <button type="button" mat-raised-button (click)="deleteUser(user)" matTooltip="This is a tooltip!" color="warn">
        Delete
      </button>
    </div>
  </div>
</div>
    <router-outlet></router-outlet>
  `,
  styles: [
    `
    .app-container{
      width: 50%;
      margin: 0 auto;
      background-color: #0000001c;
      border-radius: 5px;

      .add-container{
        display:flex;
        justify-content: center
      }
      .single-card-container{
        background-color: #80808014!important;
        width: 70%;
        border: 1px solid black;
        margin: 1rem auto;
      }

      .btn-choice-container{
        display:flex;
        justify-content: space-evenly;
        width: 50%;
        margin: 0 auto;
        }

        .add-icon{
        font-size: 32px;
        }

        .add-icon:hover{
          cursor: pointer;
          color: #747474;
        }
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
    private http: HttpClient,
    public dialog: MatDialog,
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

  loadUsers() {
    this.store.dispatch(loadUsers());
    this.users$ = this.store.select(selectUsersList);
  }

  editForm() {
    this.store.dispatch(editUser({ user: { ...this.form.value, id: this.userIdToEdit } }));
    this.form.reset();
  }

  deleteUser(user: User) {
    console.log('DELETE user: ', user);
    this.store.dispatch(deleteUser({ user }));
  }

  openDialog(user?: User) {
    if(user){
      this.userIdToEdit = user.id;

      this.dialog.open(EditDialogComponent, {
        data: {
          ...user
        }
      }).afterClosed().subscribe((res) => {
        console.log('res modale chiusa', res);
        if (res) {
          this.store.dispatch(editUser({ user: { ...res, id: this.userIdToEdit } }));
          this.form.reset();
        }
      });
    } else {
      this.dialog.open(EditDialogComponent, {
        data: {
          create: true
        }
      }).afterClosed().subscribe((res) => {
        console.log('res modale chiusa', res);
        if (res) {
          this.store.dispatch(addUsers({ user: res }));
          this.form.reset();
        }

      });
    }
  }

  // createUser() {
  //   let dialogRef = this.dialog.open(EditDialogComponent, {
  //     data: {
  //       create: true
  //     }
  //   }).afterClosed().subscribe((res) => {
  //     console.log('res modale chiusa', res);
  //     if (res) {
  //       this.store.dispatch(addUsers({ user: res }));
  //       this.form.reset();
  //     }

  //   });
  // }
}


