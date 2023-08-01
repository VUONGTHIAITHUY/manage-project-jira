import { User } from './../../models/user.model';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  formUser: FormGroup;


  constructor(
    private _fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private _userService: UserService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<EditUserComponent>,


  ) {
    this.formUser = this._fb.group({
      id: this.data?.userId,
      email: [this.data?.email, [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      name: [this.data?.name, [Validators.required]],
      phoneNumber: [this.data?.phoneNumber, [Validators.required]],
    })
  }

  ngOnInit(): void {
  }

  public myError = (controlName: string, errorName: string) => {
    return this.formUser?.controls[controlName].hasError(errorName);
  }

  onSave() {
    if (this.formUser.invalid) {
      return;
    }
    const val = this.formUser.value;
    this._userService.editUser(val).subscribe((res) => {
      if (res?.statusCode === 200) {
        this._snackBar.open(res.message, '', {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: 'success-snackbar'
        })
        this.dialogRef.close();
      }
    },
      error => {
        this.dialogRef.close();
      }
    )
  }


}
