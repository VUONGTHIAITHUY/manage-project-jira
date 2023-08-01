import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/core/services/base.service';
import { Category, Project, ProjectDetailModel } from './models/project.model';
import { User } from '../user/models/user.model';
import { Priority, TaskModel, TaskType } from './models/task.model';
import { CommentUser } from '../shared/models/comment.mode';
import { Observable } from 'rxjs';
import { IResponse } from 'src/app/core/models/IResponse.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends BaseService {

  apiUrl: string = 'api/Project';
  apiUrlComment: string = 'api/comment';
  apiUrlPriority: string = 'api/Priority';
  apiUrlTaskType: string = 'api/TaskType';

  getAll(keyword?: string) {
    return this.get<Project[]>(`${this.apiUrl}/getAllProject${(keyword ? '?keyword=' + keyword : '')}`);
  }

  getProjectDetail(id: number) {
    return this.get<ProjectDetailModel>(`${this.apiUrl}/getProjectDetail?id=${id}`)
  }

  createProject(data: Object) {
    return this.post<Project>(`${this.apiUrl}/createProjectAuthorize`, data)
  }

  createTask(data: TaskModel) {
    return this.post<TaskModel>(`${this.apiUrl}/createTask`, data)
  }

  deleteProject(projectId: number) {
    return this.delete(`${this.apiUrl}/deleteProject?projectId=${projectId}`)
  }

  updateProject(projectId: number, data: Object) {
    return this.put(`${this.apiUrl}/updateProject?projectId=${projectId}`, data)
  }

  removeUserFromProject(data: Object) {
    return this.post<User>(`${this.apiUrl}/removeUserFromProject`, data)
  }

  assignUserProject(data: { projectId: any; userId: any }) {
    return this.post(`${this.apiUrl}/assignUserProject`, data)
  }

  updatePriority(params: { taskId: number | undefined; priorityId: number }) {
    return this.put(`${this.apiUrl}/updatePriority`, params)
  }

  updateEstimate(params: { taskId: number | undefined; originalEstimate: number }) {
    return this.put(`${this.apiUrl}/updateEstimate`, params)
  }

  updateTimeTracking(params: { taskId: number | undefined; timeTrackingSpent: number; timeTrackingRemaining: number }) {
    return this.put(`${this.apiUrl}/updateTimeTracking`, params)
  }

  updateTask(task: TaskModel): Observable<IResponse<TaskModel>> {
    return this.post<TaskModel>(`${this.apiUrl}/updateTask`, task);
  }

  updateDescription(params: { taskId: number; description: string; }) {
    return this.put(`${this.apiUrl}/updateDescription`, params)
  }

  updateStatus(params: { taskId: number; statusId: string; }) {
    return this.put(`${this.apiUrl}/updateStatus`, params)
  }

  assignUserTask(params: { taskId: number; userId: number; }) {
    return this.post(`${this.apiUrl}/assignUserTask`, params)
  }

  removeUserFromTask(params: { taskId: number; userId: number; }) {
    return this.post(`${this.apiUrl}/removeUserFromTask`, params)
  }

  getTaskDetail(id: number) {
    return this.get<TaskModel>(`${this.apiUrl}/getTaskDetail?taskId=${id}`)
  }

  addComment(body: any) {
    return this.post<any>(`${this.apiUrlComment}/insertComment`, body)
  }

  deleteComment(idComment: number) {
    return this.delete(`${this.apiUrlComment}/deleteComment?idComment=${idComment}`)
  }

  deleteTask(taskId: number) {
    return this.delete(`${this.apiUrl}/removeTask?taskId=${taskId}`)
  }

  editCommnent(comment: CommentUser) {
    return this.put(`${this.apiUrlComment}/updateComment?id=${comment.id}&contentComment=${comment.commentContent}`, {})
  }

  getPriority() {
    return this.get<Priority[]>(`${this.apiUrlPriority}/getAll`)
  }

  getTaskType() {
    return this.get<TaskType[]>(`${this.apiUrlTaskType}/getAll`);
  }
}
