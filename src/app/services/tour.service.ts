import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Utils } from '../classes/utils';
import { City, Report, ReportDTO, Tag, Theme, Tour, TourDTO, TourSearchDTO } from '../dtos/tour';

@Injectable({
  providedIn: 'root'
})
export class TourService {

  constructor(private http: HttpClient) { }

  public get(tourId: string): Observable<Tour> {
    const params = new HttpParams().append('id', tourId)
    return this.http.get<Tour>(environment.apiUrl + '/tour', { params })
  }

  public getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(environment.apiUrl + '/tag')
  }

  public getAllThemes(): Observable<Theme[]> {
    return this.http.get<Theme[]>(environment.apiUrl + '/theme')
  }

  public getAllCities(): Observable<City[]> {
    return this.http.get<City[]>(environment.apiUrl + '/city')
  }

  public search(s: TourSearchDTO): Observable<Tour[]> {
    const params = new HttpParams()
      .append('cityId', s.cityId)
      .append('duration', s.approxDuration)
      .append('themeId', s.themeId)
      .appendAll({'tags': s.tags})
    return this.http.get<Tour[]>(environment.apiUrl + '/tour/search', { params })
  }

  // -----

  public createTour(t: TourDTO): Observable<Tour> {
    return from(this.mapTourPhotos(t)).pipe(
      switchMap(tour => this.http.post<Tour>(environment.apiUrl + '/tour/create', tour))
    )
  }

  /** for each photo in each stop, maps it to Base64 string and returns a new object */
  private async mapTourPhotos(t: TourDTO | any): Promise<TourDTO | any> {
    let t1 = JSON.parse(JSON.stringify(t))
    for(let i = 0; i < t.stops.length; i++) {
      for(let j = 0; j < t.stops[i].images.length; j++) {
        t1.stops[i].images[j] = await Utils.fileToBase64(t.stops[i].images[j])
      }
    }
    return t1
  }

  public createReport(r: ReportDTO): Observable<Report> {
    return this.http.post<Report>(environment.apiUrl + '/tour/report/create', r)
  }

}
