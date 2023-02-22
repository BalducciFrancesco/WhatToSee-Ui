import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Utils } from '../classes/utils';
import { City, Report, ReportDTO, Suggestion, SuggestionDTO, Tag, Theme, Tour, TourDTO, TourSearchDTO } from '../dtos/tour';

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
    coordinates: {
      latitude: 111,
      longitude: 222,
    },
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
    creationTimeStamp: new Date(),
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
    // return of([{ id: 1, name: 'asd' }, { id: 2, name: 'eeee' }])
    return this.http.get<Tag[]>(environment.apiUrl + '/tag/')
  }

  public getAllThemes(): Observable<Theme[]> {
    return this.http.get<Theme[]>(environment.apiUrl + '/theme/')
  }

  public getAllCities(): Observable<City[]> {
    return this.http.get<City[]>(environment.apiUrl + '/city/')
  }

  public search(s: TourSearchDTO): Observable<Tour[]> {
    // return of([fakeTour])
    const params = new HttpParams()
      .append('cityId', s.cityId)
      .append('duration', s.approxDuration)
      .append('themeId', s.themeId)
      .appendAll({'tagsIds': s.tagsIds})
    return this.http.get<Tour[]>(environment.apiUrl + '/tour/search', { params })
  }

  // -----

  public createTour(t: TourDTO): Observable<Tour> {
    return from(this.mapTourPhotos(t)).pipe(
      switchMap(tour => this.http.post<Tour>(environment.apiUrl + '/tour/create', tour))
    )
  }

  /** for each photo in each stop, maps it to Base64 string */
  private async mapTourPhotos(t: TourDTO | any) {
    for(let i = 0; i < t.stops.length; i++) {
      for(let j = 0; j < t.stops[i].images.length; j++) {
        t.stops[i].images[j] = await Utils.fileToBase64(t.stops[i].images[j])
      }
    }
    return t
  }

  public createSuggestion(s: SuggestionDTO): Observable<Suggestion> {
    return this.http.post<Suggestion>(environment.apiUrl + '/tour/suggestion/create', s)
  }
  
  public createReport(r: ReportDTO): Observable<Report> {
    return this.http.post<Report>(environment.apiUrl + '/tour/report/create', r)
  }

}
