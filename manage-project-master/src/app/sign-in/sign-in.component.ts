import { UserService } from './../modules/user/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  submitted = false;
  signInForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _router: Router
  ) {
    this.signInForm = this._fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  public myError = (controlName: string, errorName: string) => {
    return this.signInForm.controls[controlName].hasError(errorName);
  }

  signIn() {
    this.submitted = true;
    if (this.signInForm?.invalid) {
      return
    }
    let val = this.signInForm?.value;
    this._userService.signIn(val).subscribe((res) => {
      console.log(res);
      if (res?.statusCode === 200) {
        this._router.navigate(['dashboard']);
        localStorage.setItem('accessToken', res.content.accessToken ?? '');
        localStorage.setItem('user', JSON.stringify(res.content) ?? '');
      }
    })
  }
}
