import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public tokenCybersoft = 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL2V4cGlyZWQiOiIyLzQvMjA0NiAzOjE2OjM4IFBNIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6ImI5Mzc2NDk3LTE2NzgtNDJlMC1iOGY4LWQ1Y2NhYTAzMjc0ZiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImFkbWluQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6WyJDX0tIIiwiQU5ZIiwiQ19MTCIsIkNfTE9QIiwiQ19ORCIsIkNIRUNLX01FTlRPUl9MT1AiLCJEX0RBTkgiLCJEX0tIIiwiRF9MTCIsIkRfTkQiLCJGX0dDIiwiRl9MT1AiLCJHRF9MSCIsIktfVFQiLCJOX1FVWUVOIiwiUUxfQkwiLCJRTF9CTSIsIlFMX0NMIiwiUUxfR0MiLCJRTF9ITVQiLCJRTF9LSCIsIlFMX0xUIiwiUUxfVFQiLCJSX0JIIiwiUl9LSCIsIlJfTEwiLCJSX0xPUCIsIlJfTkQiLCJSX1ZMIiwiVV9LSCIsIlVfTEwiLCJVX0xPUCIsIlVfTkQiLCJYX0tIX0wiLCJRTF9MQ04iLCJRTF9US0QiLCJRTF9DSFRMIiwiUUxfUk0iLCJEX0JUIiwiS19DSEVDS19MIiwiUUxfQ0NOIiwiUUxfS0tIViIsIlVfTkdBWV9CSCIsIlFMX0NPTkZJRyJdLCJuYmYiOjE2NzU0OTg1OTgsImV4cCI6MTY3NTUwMjE5OH0.qDwGahgmxsJyfRjjpEUJk3i-fjLHKTCEOs3VKhTMVyo';
  private _isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  setIsLoading(isLoading: boolean) {
    this._isLoading$.next(isLoading);
  }

  get isLoading$() {
    return this._isLoading$;
  }

  isLogin(): boolean {
    let accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      return true;
    }
    return false;
  }

  getToken(): string {
    let accessToken = localStorage.getItem('accessToken') ?? '';
    return accessToken;
  }

  clearLocalStorage(): void {
    localStorage.clear();
  }

}
