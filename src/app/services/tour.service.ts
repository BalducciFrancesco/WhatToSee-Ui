import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tag, Theme, Tour, TourDTO } from '../dtos/tour';

@Injectable({
  providedIn: 'root'
})
export class TourService {

  constructor(private http: HttpClient) { }

  public getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(environment.apiUrl + '/tags')
  }

  public getAllThemes(): Observable<Theme[]> {
    return this.http.get<Theme[]>(environment.apiUrl + '/themes')
  }

  public createTour(t: TourDTO): Observable<Tour> {
    return this.http.post<Tour>(environment.apiUrl + '/tour/create', t)
  }

}
