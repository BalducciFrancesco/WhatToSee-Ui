import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Utils } from '../classes/utils';
import { City, Report, ReportDTO, Review, ReviewDTO, Tag, Theme, Tour, TourDTO, TourSearchDTO } from '../dtos/tour';

@Injectable({
  providedIn: 'root'
})
export class TourService {

  constructor(private http: HttpClient) { }

  public getById(tourId: string): Observable<Tour> {
    return this.http.get<Tour>(environment.apiUrl + '/tour/' + tourId)
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
    let params = new HttpParams()
    s.city ? params = params.append('cityId', s.city.id) : null
    s.approxDuration ? params = params.append('approxDuration', s.approxDuration) : null
    s.theme ? params = params.append('themeId', s.theme.id) : null
    s.tags ? params = params.appendAll({'tagIds': s.tags.map(t => t.id)}) : null
    return this.http.get<Tour[]>(environment.apiUrl + '/tour/search', { params })
  }

  // -----

  public createTour(t: TourDTO): Observable<Tour> {
    let mapped: any = {
      ...t,
      cityId: t.city.id,
      themeId: t.theme.id,
      sharedTouristIds: t.sharedTourists?.map(t => t.id)
    }
    delete mapped.city
    delete mapped.theme
    delete mapped.sharedTourists
    return this.http.post<Tour>(environment.apiUrl + '/tour', mapped)
  }

  public createReview(r: ReviewDTO): Observable<Review> {
    return this.http.post<Review>(environment.apiUrl + '/tour/review', r)
  }

  public createReport(r: ReportDTO): Observable<Report> {
    return this.http.post<Report>(environment.apiUrl + '/tour/report', r)
  }

}
