import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/core/services/base.service';
import { Category, Project } from './models/project.model';
import { User } from '../user/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends BaseService {

  apiUrl: string = 'api/Project';

  getAll() {
    return this.get<Project[]>(`${this.apiUrl}/getAllProject`);
  }

  getProjectCategory() {
    return this.get<Category[]>('api/ProjectCategory')
  }

  createProject(data: Project) {
    return this.post<Project>(`${this.apiUrl}/createProjectAuthorize`, data)
  }

  deleteProject(projectId: number) {
    return this.delete(`${this.apiUrl}/deleteProject?projectId=${projectId}`)
  }

  removeUserFromProject(data: Object) {
    return this.post<User>(`${this.apiUrl}/removeUserFromProject`, data)
  }

  updateProject(projectId: number, data: Project) {
    return this.put(`${this.apiUrl}/updateProject?projectId=${projectId}`, data)

  }
}
