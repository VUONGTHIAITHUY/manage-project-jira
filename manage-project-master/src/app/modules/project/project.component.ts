import { MatDialog } from '@angular/material/dialog';
import { Project } from './models/project.model';
import { ProjectService } from './project.service';
import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CreateEditProjectComponent } from './components/create-edit-project/create-edit-project.component';
import { MatMenuTrigger } from '@angular/material/menu';
import { User } from '../user/models/user.model';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})

export class ProjectComponent implements OnInit {

  displayedColumns: string[] = ['id', 'projectName', 'categoryName', 'creator', 'members', 'action'];
  listMember: Object[] | undefined = [];
  listProject: Project[] = [];
  newListProject: Project[] = [];
  dataSource = new MatTableDataSource();
  projectId: number = 0;
  deleteDialog: any;
  @ViewChild('myTemplate') customTemplate: TemplateRef<any> | undefined
  constructor(
    private _projectService: ProjectService,
    public dialog: MatDialog
  ) {
  }


  ngOnInit(): void {
    this.getListProject();
    // this.getListMember();
  }

  getListProject() {
    this._projectService.getAll().subscribe((res) => {
      this.listProject = res.content.reverse() ?? [];
      // this.newListProject = this.listProject.map(item => {
      //   this.listMember = item.members?.map((member: any) => {
      //     return {
      //       ...member,
      //       name: member.name.match(/\b(\w)/g).join('')
      //     };
      //   });
      //   return {
      //     ...item,
      //     members: this.listMember
      //   };
      // });
    });
  }

  addMember() {
    alert('Chức năng chưa khả dụng');
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


}
