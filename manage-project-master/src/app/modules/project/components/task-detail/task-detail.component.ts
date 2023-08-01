import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommentUser } from 'src/app/modules/shared/models/comment.mode';
import { StatusService } from 'src/app/modules/shared/services/status.service';
import { StatusModel } from 'src/app/modules/shared/models/status.model';
import { } from '@fortawesome/fontawesome-svg-core';
import { ProjectService } from 'src/app/modules/project/project.service';
import { User } from 'src/app/modules/user/models/user.model';
import { debounceTime, switchMap } from 'rxjs';
import { UserService } from 'src/app/modules/user/user.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { Priority, TaskModel } from '../../models/task.model';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {

  task: TaskModel = new TaskModel();
  id: any;
  comment: any;
  statusList: StatusModel[] = [];
  priorityList: Priority[] = [];
  userList: User[] = [];
  persentageTimeSpent: number = 0;
  myControl = new FormControl();
  projectId: any;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private _statusService: StatusService,
    private _userService: UserService,
    private _projectService: ProjectService
  ) { }
  ngOnInit(): void {
    this.id = this._activatedRoute.snapshot.params['id'];
    this.projectId = this._activatedRoute.snapshot.params['projectId'];
    
    this.getStatus();
    this.getPriority();

    if (this.id) {
      this.getTaskDetail();
    }

    this.myControl.valueChanges.pipe(
      debounceTime(350),
      switchMap((value: any) => {
        return this._userService.getUser(value)
      }),
    ).subscribe(
      res => {
        this.userList = res.content
      }
    );
  }

  getTaskDetail() {
    this._projectService.getTaskDetail(this.id).subscribe(
      res => {
        this.task = res.content;
        const totalTime = this.task.timeTrackingRemaining + this.task.timeTrackingSpent;
        this.persentageTimeSpent = (this.task.timeTrackingSpent / totalTime) * 100;
      }
    );
  }

  getStatus() {
    this._statusService.getStatus().subscribe(
      res => {
        if (res.statusCode === 200) {
          this.statusList = res.content
        }
      }
    )
  }

  onAddComment() {
    if (!this.comment) {
      this._snackBar.open('Please input comment before press enter.', '', {
        verticalPosition: 'top',
        panelClass: 'error-snackbar',
        duration: 3000,
      });
      return;
    }
    let body = {
      taskId: Number.parseInt(this.id),
      contentComment: this.comment
    }
    this._projectService.addComment(body).subscribe(
      res => {
        if (res.statusCode === 200) {
          this.comment = '';
          this._snackBar.open(res.message, '', {
            verticalPosition: 'top',
            panelClass: 'success-snackbar',
            duration: 3000,
          });
          this.getTaskDetail();
        }
      }
    )
  }

  getStatusName(statusId: string): string {
    let status = this.statusList.find(x => x.statusId === statusId);
    if (!status) {
      return '';
    }
    return status.statusName;
  }

  deleteComment(commentId: any) {
    this._projectService.deleteComment(commentId).subscribe(
      res => {
        if (res.statusCode === 200) {
          this.comment = '';
          this._snackBar.open(res.message, '', {
            verticalPosition: 'top',
            panelClass: 'success-snackbar',
            duration: 3000,
          });
          this.getTaskDetail();
        }
      }
    )
  }

  getPriority() {
    this._projectService.getPriority().subscribe(
      res => {
        if (res.statusCode === 200) {
          this.priorityList = res.content
        }
      }
    );
  }

  editComment(comment: CommentUser) {
    comment.isEdit = true;
  }

  saveComment(comment: CommentUser) {
    this._projectService.editCommnent(comment).subscribe(
      res => {
        if (res.statusCode === 200) {
          this.comment = '';
          this._snackBar.open(res.message, '', {
            verticalPosition: 'top',
            panelClass: 'success-snackbar',
            duration: 3000,
          });
          this.getTaskDetail();
          comment.isEdit = false;
        }
      }
    )
  }

  onChangePriority(event: any) {
    this._projectService.updatePriority({ taskId: this.task.taskId, priorityId: event }).subscribe(
      res => {
        if (res.statusCode === 200) {
          this._snackBar.open(res.message, '', {
            verticalPosition: 'top',
            panelClass: 'success-snackbar',
            duration: 3000,
          });
        }
      }
    )
  }

  onChangeEstimate(event: any) {
    this._projectService.updateEstimate({ taskId: this.task.taskId, originalEstimate: event }).subscribe(
      res => {
        if (res.statusCode === 200) {
          this._snackBar.open(res.message, '', {
            verticalPosition: 'top',
            panelClass: 'success-snackbar',
            duration: 3000,
          });
        }
      }
    )
  }

  updateTimeTracking() {
    this._projectService.updateTimeTracking({ taskId: this.task.taskId, timeTrackingSpent: this.task.timeTrackingSpent, timeTrackingRemaining: this.task.timeTrackingRemaining })
      .subscribe(
        res => {
          if (res.statusCode === 200) {
            this._snackBar.open(res.message, '', {
              verticalPosition: 'top',
              panelClass: 'success-snackbar',
              duration: 3000,
            });
            this.getTaskDetail();
          }
        }
      )
  }

  updateDescription() {
    this._projectService.updateDescription({ taskId: this.task.taskId, description: this.task.description })
      .subscribe(
        res => {
          if (res.statusCode === 200) {
            this._snackBar.open(res.message, '', {
              verticalPosition: 'top',
              panelClass: 'success-snackbar',
              duration: 3000,
            });
            this.getTaskDetail();
          }
        }
      )
  }

  deleteUserAssign(user: User) {
    console.log(user);

  }

  assignUser() {
    const user = this.myControl.value as User;
    if (this.myControl.value) {
      let val = {
        taskId: this.task.taskId,
        userId: user.userId
      }
      this._projectService.assignUserTask(val).subscribe((res) => {
        if (res.statusCode === 200) {
          this._snackBar.open(res.message, '', {
            verticalPosition: 'top',
            panelClass: 'success-snackbar',
            duration: 3000,
          });
          this.getTaskDetail();
        }
      })
    }
  }

  onChangeStatus(event: any) {
    this._projectService.updateStatus({ taskId: this.task.taskId, statusId: event })
      .subscribe(
        res => {
          if (res.statusCode === 200) {
            this._snackBar.open(res.message, '', {
              verticalPosition: 'top',
              panelClass: 'success-snackbar',
              duration: 3000,
            });
            this.getTaskDetail();
          }
        }
      )
  }

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }
}
