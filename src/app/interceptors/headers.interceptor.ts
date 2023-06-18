import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';


/**
 * Interceptor for HTTP requests.
 * Appends user id to request header, if logged. 
 */
@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  constructor(private userService: UserService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const loggedUser = this.userService.getSession();
    if(loggedUser !== null) {
      request = request.clone({
        setHeaders: {
          Authentication: loggedUser.id.toString()
        }
      });
    }
    return next.handle(request);
  }

}
