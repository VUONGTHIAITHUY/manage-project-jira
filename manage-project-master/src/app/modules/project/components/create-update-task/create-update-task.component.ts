import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Priority, TaskModel, TaskType } from '../../models/task.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../project.service';
import { Project } from '../../models/project.model';
import { StatusModel } from 'src/app/modules/shared/models/status.model';
import { User } from 'src/app/modules/user/models/user.model';
import { StatusService } from 'src/app/modules/shared/services/status.service';
import { UserService } from 'src/app/modules/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-create-update-task',
  templateUrl: './create-update-task.component.html',
  styleUrls: ['./create-update-task.component.scss']
})
export class CreateUpdateTaskComponent implements OnInit {
  title: string = 'Create Task';
  taskForm!: FormGroup;
  persentageTimeSpent: number = 0;
  projectList: Project[] = [];
  statusList: StatusModel[] = [];
  priorityList: Priority[] = [];
  userList: User[] = [];
  taskTypeList: TaskType[] = [];
  task: TaskModel | undefined;
  projectId: number = 0;
  taskId: any;

  constructor(
    private _statusService: StatusService,
    private _projectService: ProjectService,
    private _userService: UserService,
    private _fb: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.initFormGroup()
    this.projectId = this._route.snapshot.params['projectId'];
    this.taskId = this._route.snapshot.params['taskId'];

    if (this.taskId !== 'new') {
      this.getTaskDetail();
    }
  }

  ngOnInit(): void {
    this.getAllProject();
    this.getStatus();
    this.getPriority();
    this.getTaskType();
    this.getUser();
  }

  getTaskDetail(): void {
    this._projectService.getTaskDetail(this.taskId).subscribe(
      res => {
        if (res.statusCode === 200) {
          if (res.content?.assigness) {
            res.content.listUserAsign = res.content.assigness?.map(x => x.id);
          }
          this.taskForm.patchValue(res.content);
          this.onChangeTime();
        }
      }
    )
  }

  initFormGroup(): void {
    this.taskForm = this._fb.group({
      taskId: 0,
      typeId: 1,
      priorityId: 1,
      projectId: [this.projectId, Validators.required],
      statusId: 1,
      taskName: ["", Validators.required],
      listUserAsign: [],
      alias: '',
      description: '',
      originalEstimate: 0,
      timeTrackingSpent: 0,
      timeTrackingRemaining: 0,
    })
  }

  getTaskType(): void {
    this._projectService.getTaskType().subscribe(
      res => {
        if (res.statusCode === 200) {
          this.taskTypeList = res.content;
        }
      }
    )
  }

  getStatus(): void {
    this._statusService.getStatus().subscribe(
      res => {
        if (res.statusCode === 200) {
          this.statusList = res.content;
        }
      }
    )
  }

  getPriority(): void {
    this._projectService.getPriority().subscribe(
      res => {
        if (res.statusCode === 200) {
          this.priorityList = res.content
        }
      }
    );
  }

  getUser(): void {
    this._userService.getUser().subscribe(
      res => {
        if (res.statusCode === 200) {
          this.userList = res.content
        }
      }
    );
  }

  getAllProject(): void {
    this._projectService.getAll().subscribe(
      res => {
        if (res.statusCode === 200) {
          this.projectList = res.content;
        }
      }
    );
  }

  onChangeTime(): void {
    const timeRemaining = this.taskForm.get('timeTrackingRemaining')?.value ?? 0;
    const timeSpent = this.taskForm.get('timeTrackingSpent')?.value ?? 0;
    const total = timeRemaining + timeSpent;
    this.persentageTimeSpent = (timeSpent / total) * 100;
  }


  public myError = (controlName: string, errorName: string) => {
    return this.taskForm?.controls[controlName].hasError(errorName);
  }

  onSave(): void {
    if (this.taskForm.invalid) {
      this._snackBar.open('Data invalid. Please input again!', '', {
        duration: 3000,
        verticalPosition: 'top',
        panelClass: 'error-snackbar'
      })
      return;
    }
    var val = this.taskForm.value;

    if (this.taskId === 'new') {
      this._projectService.createTask(val).pipe(
        finalize(() => {
          this._router.navigateByUrl(`/project/${this.projectId}`)
        })
      ).subscribe(
        res => {
          if (res.statusCode === 200) {
            this._snackBar.open(res.message, '', {
              duration: 3000,
              verticalPosition: 'top',
              panelClass: 'success-snackbar'
            })
          }
        }
      )
    } else {
      this._projectService.updateTask(val)
        .pipe(
          finalize(() => {
            this._router.navigateByUrl(`/project/${this.projectId}`)
          })
        ).subscribe(
          res => {
            if (res.statusCode === 200) {
              this._snackBar.open(res.message, '', {
                duration: 3000,
                verticalPosition: 'top',
                panelClass: 'success-snackbar'
              })
            }
          }
        )
    }
  }
}
