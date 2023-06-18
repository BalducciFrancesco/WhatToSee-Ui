import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { UserRole } from '../dtos/user';

/**
 * Guard that checks if the user is logged and has the required role to access the page.
 * If not, redirects to the login page.
 */
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  
  constructor(private router: Router, private userService: UserService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const loggedUserRole = this.userService.getSessionRole();
    if(loggedUserRole !== null) { // is logged?
      const routeRole: UserRole[] = route.data['role'];
      if(!routeRole || (routeRole.indexOf(loggedUserRole) !== -1)) { // if role is defined for role, does it match?
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
