import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class HandleRequestInterceptor implements HttpInterceptor {

  constructor(
    private _authService: AuthService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // lấy access tocken từ localstorage
    this._authService.setIsLoading(true);
    const accessToken = this._authService.getToken();
    //set vào header
    request = request.clone({
      url: `${request.url}`,
      setHeaders: {
        'Authorization': `Bearer ${accessToken}`,
        'TokenCybersoft': this._authService.tokenCybersoft
      },
    });

    return next.handle(request).pipe(
      finalize(() => {
        this._authService.setIsLoading(false);
      })
    );
  }
}
