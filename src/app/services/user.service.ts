import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User, UserLoginDTO, UserRegisterDTO } from '../dtos/user';
import { UserRole } from './../dtos/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  // username is back-end trimmed and case-insensitive    
  public login(u: UserLoginDTO): Observable<User> {
    return this.http.post<User>(environment.apiUrl + '/user/login', u).pipe(tap(u => this.saveSession(u)))
  }

  // username is back-end trimmed and case-insensitive
  // first name and last name are back-end trimmed
  public register(u: UserRegisterDTO, role: UserRole): Observable<User> {
    return this.http.post<User>(environment.apiUrl + '/user/' + role + '/register', u).pipe(tap(u => this.saveSession(u)))
  }


  // -----

  public logout() {
    sessionStorage.removeItem('logged-user');
  }

  public saveSession(u: User) {
    sessionStorage.setItem('logged-user', window.btoa(JSON.stringify(u)));
  }

  public getSession(): User | null {
    let u = sessionStorage.getItem('logged-user');
    return u ? JSON.parse(window.atob(u)) : null;
  }

  public getSessionRole(): UserRole | null {
    let u = sessionStorage.getItem('logged-user');
    let u1 = u ? JSON.parse(window.atob(u)) as User : null;
    return u1 !== null ? u1.role : null
  }

  // -----

  public getAllByRole(r: UserRole): Observable<User[]> {
    return this.http.get<User[]>(environment.apiUrl + '/user/' + r);
  }

}
