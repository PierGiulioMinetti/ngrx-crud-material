import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-edit-dialog',
  template: `
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
      <div>
        Image url
        <input type="text" formControlName="image">
      </div>


    </form>
  </div>
    <button type="text" (click)="saveForm()">
      save
    </button>
    <button type="text" (click)="closeDialog()">
      close
    </button>
  `,
  styles: [
  ]
})
export class EditDialogComponent implements OnInit {
  form!: FormGroup;


  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public user:any,
    ) { }

  ngOnInit(): void {
    console.log(this.user);
    this.initForm();

  }

  initForm() {
    this.form = this.fb.group({
      name: [this.user.name],
      occupation: [this.user.occupation],
      image: [this.user.image],
    });
  }

  closeDialog() {
    this.dialogRef.close(null);
  }

  saveForm(){
    this.dialogRef.close(this.form.value);

  }
}
