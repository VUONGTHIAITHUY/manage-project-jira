import { Observable, debounceTime, map, of, startWith, switchMap } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Component, HostListener, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatMenuTrigger } from '@angular/material/menu';
import { Project } from '../../models/project.model';
import { User } from 'src/app/modules/user/models/user.model';
import { ProjectService } from '../../project.service';
import { UserService } from 'src/app/modules/user/user.service';
import { CreateEditProjectComponent } from '../create-edit-project/create-edit-project.component';

@Component({
  selector: 'app-project',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})

export class ProjectComponent implements OnInit {

  @ViewChild('myTemplate') customTemplate: TemplateRef<any> | undefined
  displayedColumns: string[] = ['id', 'projectName', 'categoryName', 'creator', 'members', 'action'];
  listMember: Object[] | undefined = [];
  listProject: Project[] = [];
  newListProject: Project[] = [];
  dataSource = new MatTableDataSource();
  projectId: number = 0;
  deleteDialog: any;
  searchUser = new FormControl();
  searchProject = new FormControl();
  isPC: boolean = true;
  userList: User[] = [];

  constructor(
    private _projectService: ProjectService,
    private _userService: UserService,
    public dialog: MatDialog
  ) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    const width = event.target.innerWidth;
    this.isPC = width >= 768
  }


  ngOnInit(): void {
    this.getListProject();
    this.getUser();

    this.searchUser.valueChanges.pipe(
      debounceTime(350),
      switchMap((value: any) => {
        return this._userService.getUser(value)
      }),
    ).subscribe(
      res => {
        this.userList = res.content
      }
    );

    this.searchProject.valueChanges.pipe(
      debounceTime(350),
      switchMap((value: any) => {
        return this._projectService.getAll(value)
      }),
    ).subscribe(
      res => {
        this.listProject = res.content.reverse() ?? [];
      }
    );
  }

  getListProject() {
    this._projectService.getAll().subscribe((res) => {
      this.listProject = res.content.reverse() ?? [];
    });
  }
  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  getUser() {
    return this._userService.getUser().subscribe(
      res => {
        this.userList = res.content;
      }
    )
  }

  addUser(projectId: number) {
    const user = this.searchUser.value as User;
    if (this.searchUser.value) {
      let val = {
        projectId: projectId,
        userId: user.userId
      }
      this._projectService.assignUserProject(val).subscribe((res) => {
        console.log(res);

      })
    }
  }


  createProject() {
    const dialogRef = this.dialog.open(CreateEditProjectComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.getListProject();
    });
  }

  editProject(project: Project) {
    const dialogRef = this.dialog.open(CreateEditProjectComponent, {
      data: project
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getListProject();
    });

  }

  deleteProject() {
    this._projectService.deleteProject(this.projectId).subscribe((res) => {
    })
    this.deleteDialog.close()

  }

  deleteUser(projectId: number, userId: number) {
    let val = {
      projectId: projectId,
      userId: userId
    }
    this._projectService.removeUserFromProject(val).subscribe((res) => {
    })
  }

  onDialog(projectId: number): void {
    this.projectId = projectId;
    if (this.customTemplate) {
      this.deleteDialog = this.dialog.open(this.customTemplate, {
      });
    }
  }

  openMyMenu(menuTrigger: MatMenuTrigger) {
    menuTrigger.openMenu();
  }

  addInMobile(){
    alert('Chức năng chỉ hỗ trợ ở desktop')
  }
}
