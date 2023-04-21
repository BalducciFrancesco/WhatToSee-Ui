import { UserRole } from './../dtos/user';
import { UserService } from 'src/app/services/user.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  
  constructor(private router: Router, private userService: UserService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const loggedUser = this.userService.getSession();
    if(loggedUser !== null) { // is logged?
      const routeRole: UserRole[] = route.data['role'];
      if(!routeRole || (routeRole.indexOf(loggedUser.role) !== -1)) { // if role is defined, does it match?
        return true;
      } else {
        this.router.navigate(['/not-authorized']);
      }
    } else {
      this.router.navigate(['/login']);
    }
    return false;
  }
}
