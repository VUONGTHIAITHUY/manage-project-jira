import { User } from './models/user.model';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/core/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {
  apiUrl: string = "api/Users";

  signUp(data: User) {
    return this.post<User>(`${this.apiUrl}/signup`, data)
  }

  signIn(data: { email: string; password: string }) {
    return this.post<User>(`${this.apiUrl}/signin`, data)
  }

  getUser(keyword?: string) {
    return this.get<User[]>(`${this.apiUrl}/getUser${(keyword ? '?keyword=' + keyword : '')}`);
  }

  editUser(data: User) {
    return this.put<User>(`${this.apiUrl}/editUser`, data)
  }

  deleteUser(userId: number) {
    return this.delete(`${this.apiUrl}/deleteUser?id=${userId}`)
  }
}
