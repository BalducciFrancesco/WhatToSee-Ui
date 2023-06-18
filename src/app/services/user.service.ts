import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User, UserLoginDTO, UserRegisterDTO } from '../dtos/user';
import { UserRole } from './../dtos/user';

/**
 * Service that handles the user features.
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  /**
   * Log in the user with the given credentials.
   * Also saves the user in the session storage if successful.
   * @param u the credentials of the user to login
   * @returns the logged user if the credentials are correct
   */
  public login(u: UserLoginDTO): Observable<User> {
    return this.http.post<User>(environment.apiUrl + '/user/login', u).pipe(tap(u => this.saveSession(u)))
  }

  /**
   * Registers the user with the given credentials, personal information and role.
   * Also saves the user in the session storage if successful.
   * @param u the credentials of the user to register
   * @param role the requested role of the user to register
   * @returns the registered user if the credentials are correct
  */
  public register(u: UserRegisterDTO, role: UserRole): Observable<User> {
    return this.http.post<User>(environment.apiUrl + '/user/' + role + '/register', u).pipe(tap(u => this.saveSession(u)))
  }

  /**
   * Log out the current user.
   * Only removes the user from the session storage.
   */
  public logout() {
    sessionStorage.removeItem('logged-user');
  }

  // -----

  /**
   * Saves the given user in the session storage in base64 format.
   * @param u the user to save in the session storage
   */
  public saveSession(u: User) {
    sessionStorage.setItem('logged-user', window.btoa(JSON.stringify(u)));
  }

  /**
   * Retrieves the user saved in the session storage from base64 format.
   * @returns the user saved in the session storage
   */
  public getSession(): User | null {
    let u = sessionStorage.getItem('logged-user');
    return u ? JSON.parse(window.atob(u)) : null;
  }

  /**
   * Retrieves the role of the user saved in the session storage from base64 format.
   * @returns the role of the user saved in the session storage
   */
  public getSessionRole(): UserRole | null {
    let u = sessionStorage.getItem('logged-user');
    let u1 = u ? JSON.parse(window.atob(u)) as User : null;
    return u1 !== null ? u1.role : null
  }

  // -----

  /**
   * Returns all users of the given role.
   * @param r the role of the users to retrieve
   * @returns all users of the given role
   */
  public getAllByRole(r: UserRole): Observable<User[]> {
    return this.http.get<User[]>(environment.apiUrl + '/user/' + r);
  }

}
