import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tag, Theme, Tour, TourDTO, TourSearchDTO } from '../dtos/tour';

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

  public search(s: TourSearchDTO): Observable<Tour[]> {
    // return of([
    //   {
    //     id: 0,
    //     author: {
    //       id: 0,
    //       username: 'oeoeo',
    //       password: 'pass-segreta',
    //       firstName: 'as',
    //       lastName: 'ere',
    //       organizationName: 'adskkda',
    //       favouriteCity: {
    //         id: 0,
    //         name: 'torino'
    //       }
    //     },
    //     title: 'Pepepe',
    //     city: {
    //       id: 0,
    //       name: 'torino'
    //     },
    //     tags: [],
    //     theme: {
    //       id: 0,
    //       name: 'eerere'
    //     },
    //     approxCost: 1,
    //     approxDuration: '03:00',
    //     creation: new Date(),
    //     lastUpdate: new Date(),
    //     stops: [],
    //     reviews: [],
    //     reports: [],
    //     suggestions: []
    //   }
    // ])
    const params = new HttpParams()
      .append('cityId', s.cityId)
      .append('duration', s.approxDuration)
      .append('themeId', s.themeId)
      .appendAll({'tagsIds': s.tagsIds})
    return this.http.get<Tour[]>(environment.apiUrl + '/themes', { params })
  }

  public createTour(t: TourDTO): Observable<Tour> {
    return this.http.post<Tour>(environment.apiUrl + '/tour/create', t)
  }

}
