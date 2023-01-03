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
    return this.http.post<User>(environment.apiUrl + '/loginTourist', u)
  }

  public loginGuide(u: UserDTO): Observable<Guide> {
    return this.http.post<Guide>(environment.apiUrl + '/loginGuide', u)
  }
  
  public loginAdministrator(u: UserDTO): Observable<Administrator> {
    return this.http.post<Administrator>(environment.apiUrl + '/loginAdministrator', u)
  }

  // -----

  public registerTourist(u: TouristDTO): Observable<Tourist> {
    return this.http.post<Tourist>(environment.apiUrl + '/registerTourist', u)
  }

  public registerGuide(u: GuideDTO): Observable<Guide> {
    return this.http.post<Guide>(environment.apiUrl + '/registerGuide', u)
  }
}
