import { Router } from '@angular/router';
import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { User } from 'src/app/modules/user/models/user.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  user: User = new User();
  @Output() toggle: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private _authService: AuthService,
    private _router: Router,

  ) {
    this.onToggle();
    console.log();


  }
  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.user = JSON.parse(user);
      console.log(this.user);
    }
  }

  onToggle() {
    this.toggle.emit();
  }

  logOut() {
    this._authService.clearLocalStorage();
    this._router.navigate(['login']);
  }
}
