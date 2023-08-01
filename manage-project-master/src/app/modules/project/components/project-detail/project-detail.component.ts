import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ProjectDetailModel } from '../../models/project.model';
import { StatusModel } from 'src/app/modules/shared/models/status.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../project.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateUpdateTaskComponent } from '../create-update-task/create-update-task.component';
import { TaskModel } from '../../models/task.model';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  @ViewChild('myTemplate') customTemplate: TemplateRef<any> | undefined

  project: ProjectDetailModel = new ProjectDetailModel();
  statusList: StatusModel[] = [];
  taskId: any;
  id: number = 0;
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _projectService: ProjectService,
    private _router: Router,
    public dialog: MatDialog

  ) {
  }

  ngOnInit(): void {
    this.id = this._activatedRoute.snapshot.params['id'];

    if (this.id) {
      this.init();
    }
  }

  init() {
    this._projectService.getProjectDetail(this.id).subscribe(
      res => {
        this.project = res.content;
      }
    )
  }

  onClickTask(task: any) {
    this._router.navigateByUrl(`/project/${this.project.id}/task-detail/${task.taskId}`);
  }

  actionTask(task: any, val: string) {
    if (val === 'add') {
      this._router.navigateByUrl(`/project/${this.project.id}/task/new`);
    } else {
      this._router.navigateByUrl(`/project/${this.project.id}/task/${task.taskId}`);
    }
  }

  deleteTask() {
    this._projectService.deleteTask(this.taskId).subscribe(
      res => {
        if (res.statusCode === 200) {
          this.init();
        }
      }
    )
  }

  onDialogDeleteTask(taskId: number): void {
    this.taskId = taskId;
    if (this.customTemplate) {
      const dialogRef = this.dialog.open(this.customTemplate, {
      });
    }
  }
}
