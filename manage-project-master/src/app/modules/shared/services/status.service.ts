import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/core/services/base.service';
import { StatusModel } from '../models/status.model';

@Injectable({
  providedIn: 'root'
})
export class StatusService extends BaseService {
  private apiUrl = 'api/status';

  getStatus() {
    return this.get<StatusModel[]>(`${this.apiUrl}/getAll`)
  }
}
