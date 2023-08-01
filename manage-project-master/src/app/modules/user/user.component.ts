import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { User } from './models/user.model';
import { UserService } from './user.service';
import { FormControl } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EditUserComponent } from './component/edit-user/edit-user.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  listUser: User[] = [];
  displayedColumns: string[] = ['userId', 'email', 'name', 'phoneNumber', 'action'];
  myControl = new FormControl();
  userId: number = 0;
  @ViewChild('myTemplate') customTemplate: TemplateRef<any> | undefined;
  deleteDialog: any;


  constructor(
    private _userService: UserService,
    public dialog: MatDialog


  ) {


  }

  ngOnInit(): void {
    this.getListUser();

  }

  getListUser() {
    return this._userService.getUser(this.myControl.value).subscribe(
      res => {
        this.listUser = res.content;
      }
    )
  }

  searchUser() {
    this.getListUser()
  }

  editUser(user: User) {
    const dialogRef = this.dialog.open(EditUserComponent, {
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getListUser();
    });

  }

  onDialog(userId: number): void {
    this.userId = userId;
    if (this.customTemplate) {
      this.deleteDialog = this.dialog.open(this.customTemplate, {
      });
    }
  }

  deleteUser() {
    this._userService.deleteUser(this.userId).subscribe((res) => {
    })
    this.deleteDialog.close()

  }

}
