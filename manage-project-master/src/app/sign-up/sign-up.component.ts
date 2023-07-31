import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../modules/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  submitted = false;

  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _snackBar: MatSnackBar,
    private _router: Router
  ) {
    this.signUpForm = this._fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      phoneNumber: ['', Validators.required]
    })
  }

  ngOnInit(): void {

  }

  public myError = (controlName: string, errorName: string) => {
    return this.signUpForm?.controls[controlName].hasError(errorName);
  }

  signUp() {
    this.submitted = true;
    if (this.signUpForm?.invalid) {
      return
    }
    let val = this.signUpForm?.value;
    this._userService.signUp(val).subscribe((res) => {
      console.log(res);
      if (res?.statusCode === 200) {
        this._router.navigate(['login']);
        this._snackBar.open(res.message, '', {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: 'success-snackbar'
        })
      }
    })

  }


}
