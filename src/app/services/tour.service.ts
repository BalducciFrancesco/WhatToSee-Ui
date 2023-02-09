import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tag, Theme, Tour, TourDTO, TourSearchDTO } from '../dtos/tour';

const fakeTour: Tour = {
  id: 0,
  author: {
    id: 0,
    username: 'oeoeo',
    firstName: 'as',
    lastName: 'ere',
    organizationName: 'adskkda',
    favouriteCity: {
      id: 0,
      name: 'torino'
    }
  },
  title: 'Pepepe',
  city: {
    id: 0,
    name: 'torino'
  },
  tags: [],
  theme: {
    id: 0,
    name: 'eerere'
  },
  approxCost: 1,
  approxDuration: '03:00',
  creation: new Date(),
  lastUpdate: new Date(),
  stops: [{
    id: 0,
    cost: 1,
    description: 'saddsa',
    duration: '22:11',
    index: 0,
    latitude: 111,
    longitude: 222,
    transportDTO: {
      transferCost: 23,
      transferDetails: 'dsadsa',
      transferDuration: '22:11',
      transferType: 'sososo',
      transferOtherOptions: 'sdadsa',
    },
    images: [],
    title: 'pwowowow',
   }],
  reviews: [{
    id: 0,
    author: {
      id: 0,
      firstName: 'sdadsa',
      lastName: 'jdsadsajm',
      username: 'jdsajdsa'
    },
    content: 'fa cacare',
    images: [],
    stars: 2,
    timeStamp: new Date(),
    title: 'dsadsa'
  }],
  reports: [],
  suggestions: []
}

@Injectable({
  providedIn: 'root'
})
export class TourService {

  constructor(private http: HttpClient) { }

  public get(tourId: string): Observable<Tour> {
    // return of(fakeTour)
    const params = new HttpParams().append('id', tourId)
    return this.http.get<Tour>(environment.apiUrl + '/tour', { params })
  }

  public getAllTags(): Observable<Tag[]> {
    return of([{ id: 1, name: 'asd' }, { id: 2, name: 'eeee' }])
    return this.http.get<Tag[]>(environment.apiUrl + '/tags')
  }

  public getAllThemes(): Observable<Theme[]> {
    return this.http.get<Theme[]>(environment.apiUrl + '/themes')
  }

  public search(s: TourSearchDTO): Observable<Tour[]> {
    // return of([fakeTour])
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
