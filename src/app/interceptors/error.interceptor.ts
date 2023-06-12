import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpStatusCode
} from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private notify: MatSnackBar) { }

  /** intercept any error status code and display its error.message with notify */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(err => {
        if(err.status === HttpStatusCode.Unauthorized) {
          this.router.navigate(['/not-authorized']);
        } else {
          this.notify.open('Errore: ' + err.error.message, undefined, { panelClass: 'error-snackbar' });
        }
        return of(err);
      })
    );
  }
}
