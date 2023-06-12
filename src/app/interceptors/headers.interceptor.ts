import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

// appends user id to request header, if exists

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
