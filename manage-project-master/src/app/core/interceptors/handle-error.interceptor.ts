import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class HandleErrorInterceptor implements HttpInterceptor {

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _snackBar: MatSnackBar,
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(
        (err: HttpErrorResponse) => {
          if ([401, 403].includes(err.status)) {
            //auto logout if 401 or 403 response returned from api
            this._authService.clearLocalStorage();
            this._router.navigate(['login']);
          }

          this._snackBar.open(`${err?.error.message}`, 'Lỗi', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: 'error-snackbar'
          });

          return throwError(err);
        }
      )
    );
  }
}
