import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';

/**
 * Interceptor for HTTP error responses.
 * If the error status code is 401, redirects to the not-authorized page.
 * Otherwise, displays the error message with a snackbar.
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private notify: MatSnackBar) { }

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
