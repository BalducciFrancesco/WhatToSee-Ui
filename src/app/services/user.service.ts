import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Administrator, Guide, GuideDTO, Tourist, TouristDTO, User, UserDTO } from '../dtos/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public loginTourist(u: UserDTO): Observable<User> {
    return this.http.post<User>(environment.apiUrl + '/tourist/login', u)
  }

  public loginGuide(u: UserDTO): Observable<Guide> {
    return this.http.post<Guide>(environment.apiUrl + '/loginGuide', u)
  }
  
  public loginAdministrator(u: UserDTO): Observable<Administrator> {
    return this.http.post<Administrator>(environment.apiUrl + '/loginAdministrator', u)
  }

  // -----

  public registerTourist(u: TouristDTO): Observable<Tourist> {
    return this.http.post<Tourist>(environment.apiUrl + '/tourist/register', u)
  }

  public registerGuide(u: GuideDTO): Observable<Guide> {
    return this.http.post<Guide>(environment.apiUrl + '/guide/register', u)
  }

  // -----

  public logout() {
    sessionStorage.removeItem('logged-user');
  }

  public saveSession(u: User) {
    // TODO enable Base64 encoding
    // sessionStorage.setItem('logged-user', btoa(JSON.stringify(u)));
    sessionStorage.setItem('logged-user', JSON.stringify(u));
  }

  public getSession(): User | null {
    let u = sessionStorage.getItem('logged-user');
    // TODO enable Base64 encoding
    // return u ? JSON.parse(atob(u)) : null;
    return u ? JSON.parse(u) : null;
  }
  
}
