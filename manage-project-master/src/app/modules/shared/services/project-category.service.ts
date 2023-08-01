import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/core/services/base.service';
import { Category } from '../../project/models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectCategoryService extends BaseService {
  private apiUrl = 'api/ProjectCategory';

  getProjectCategory() {
    return this.get<Category[]>(`${this.apiUrl}`)
  }
}