import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponse } from '../models/IResponse.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  constructor(private http: HttpClient) { }

  get<T>(url: string): Observable<IResponse<T>> {
    return this.http.get<IResponse<T>>(`${environment.baseUrl}/${url}`);
  }

  post<T>(url: string, body: Object): Observable<IResponse<T>> {
    return this.http.post<IResponse<T>>(`${environment.baseUrl}/${url}`, body)
  }

  put<T>(url: string, body: Object): Observable<IResponse<T>> {
    return this.http.put<IResponse<T>>(`${environment.baseUrl}/${url}`, body)
  }

  delete<T>(url: string): Observable<IResponse<T>> {
    return this.http.delete<IResponse<T>>(`${environment.baseUrl}/${url}`)
  }

}
